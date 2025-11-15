from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication 
from .serializers  import Profile, ProfileSerializer
# Create your views here.

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class =  ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        queryset = Profile.objects.filter(private=False)

        if user.is_authenticated:
            queryset = queryset | Profile.objects.filter(user=user)
        
        return queryset.distinct()
    def perform_create(self, serializer):
        user = self.request.user
        if Profile.objects.filter(user=user).exists():
            return Response(status=400)
        serializer.save(user=user)
