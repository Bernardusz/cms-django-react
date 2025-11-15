from rest_framework import serializers
from .models import Content, Section, ContentAccess, Comment

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class ContentAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentAccess
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ContentSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    content_accesses = ContentAccessSerializer(many=True, read_only=True, source='content_accesses')
    class Meta:
        model = Content
        fields = '__all__'
