from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.utils.text import slugify

# Content represents an item composed of ordered Sections. Images are stored
# via ImageField; configure MEDIA_ROOT / storage backend in `settings.py`.
class Content(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    private = models.BooleanField(default=False)
    # cover image for the content (optional)
    cover = models.ImageField(upload_to='content/covers/%Y/%m/%d/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = ArrayField(
        models.CharField(max_length=50), blank=True, default=lambda: []
    )
    collaborators = models.ManyToManyField(
        'Profile', through='ContentAccess', related_name='accessible_contents'
    )


    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            # 👇 Avoid duplicate slugs
            while Content.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)
    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.ForeignKey('Content', related_name='comments', on_delete=models.CASCADE)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Section(models.Model):
    TEXT = 'text'
    IMAGE = 'image'
    SECTION_TYPE_CHOICES = [
        (TEXT, 'Text'),
        (IMAGE, 'Image'),
    ]

    # Each section belongs to a Content; Content.sections will be accessible
    # as a reverse relation via `related_name='sections'`.
    content= models.ForeignKey("Content", related_name='sections', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=10, choices=SECTION_TYPE_CHOICES, default=TEXT)

    # when `type == TEXT`
    text = models.TextField(null=True, blank=True)

    # when `type == IMAGE`
    image = models.ImageField(upload_to='content/', null=True, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    caption = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['order']

    def clean(self):
        # enforce that the correct field is present for the chosen type
        if self.type == self.TEXT and not self.text:
            raise ValidationError('Text sections must include `text`.')
        if self.type == self.IMAGE and not self.image:
            raise ValidationError('Image sections must include an `image`.')

    def __str__(self):
        return f"Section {self.pk} ({self.type}) of {self.content_id}"


class ContentAccess(models.Model):
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('editor', 'Editor'),
        ('reader', 'Reader')
    ]
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    content = models.ForeignKey('Content', related_name='content_accesses' ,on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    class Meta:
        unique_together = ('profile', 'content')

    def __str__(self):
        return f"{self.profile_id} - {self.content_id} ({self.role})"


