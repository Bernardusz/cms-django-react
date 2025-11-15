from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication 
from .serializers  import UserSerializer
# Create your views here.

class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # return the created user (password is write-only so it won't be exposed)
            return Response(UserSerializer(user).data, status=201)
        return Response(serializer.errors, status=400)

class UserDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request):
        request.user.delete()
        return Response(status=204)