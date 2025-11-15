from django.contrib import admin
from .models import Content, Comment, ContentAccess, Section
# Register your models here.
admin.site.register(Content)
admin.site.register(Comment)
admin.site.register(ContentAccess)
admin.site.register(Section)
