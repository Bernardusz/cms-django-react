from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_query_name="user")
    description = models.TextField()
    created_date = models.DateField(auto_now_add=True)
    private = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)


    def __str__(self):
        return self.user.username
