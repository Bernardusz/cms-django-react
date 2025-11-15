from .serializers import (
    ContentSerializer, SectionSerializer, 
    ContentAccessSerializer, CommentSerializer
)
from .models import Content, Comment, ContentAccess, Section
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication 
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class ContentViewSet(viewsets.ModelViewSet):
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        queryset = Content.objects.filter(private=False)

        if user.is_authenticated:
            queryset = queryset | Content.objects.filter(collaborators__user=user)
        
        return queryset.distinct()

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        content_slug = self.kwargs.get('content_slug')
        if not content_slug:
            return Section.objects.none()
        return Section.objects.filter(content__slug=content_slug)
    
class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        content_slug = self.kwargs.get('content_slug')
        if not content_slug:
            return Comment.objects.none()
        return Comment.objects.filter(content__slug=content_slug)

    
class ContentAccessViewSet(viewsets.ModelViewSet):
    serializer_class = ContentAccessSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        content_slug = self.kwargs.get('content_slug')
        user = self.request.user

        # Only show accesses related to this content
        qs = ContentAccess.objects.filter(content__slug=content_slug)

        # Optionally restrict to users who have access
        if not ContentAccess.objects.filter(content__slug=content_slug, profile__user=user).exists():
            return ContentAccess.objects.none()
        
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        content_slug = self.kwargs.get('content_slug')
        content = Content.objects.get(slug=content_slug)

        # check if user is owner
        is_owner = ContentAccess.objects.filter(
            content=content, profile__user=user, role='owner'
        ).exists()

        if not is_owner:
            raise PermissionDenied("Only owner can manage access")

        serializer.save(content=content)

    
