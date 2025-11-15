from django.contrib.auth.models import User
from Profile.models import Profile
from Profile.serializers import ProfileSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    # require nested profile data on signup
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # profile is required, pop without default so missing profile raises
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')

        # create user with password
        user = User.objects.create_user(password=password, **validated_data)

        # validate and create nested profile
        profile_serializer = ProfileSerializer(data=profile_data)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save(user=user)

        return user