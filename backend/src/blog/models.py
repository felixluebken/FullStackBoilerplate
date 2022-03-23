from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    
    image = ProcessedImageField(
        upload_to="blog/",
        default="/default/blog.svg",
        null=True,
        processors=[ResizeToFill(1920,1080)],
        format='JPEG',
        options={'quality':1000}
    )
    image_thumbnail_big = ProcessedImageField(
        upload_to="blog/",
        default="/default/blog.svg",
        null=True,
        processors=[ResizeToFill(500,400)],
        format='JPEG',
        options={'quality':60}
    )
    image_thumbnail_small = ProcessedImageField(
        upload_to="blog/",
        default="/default/blog.svg",
        null=True,
        processors=[ResizeToFill(100,100)],
        format='JPEG',
        options={'quality':30}
    )
    
    date = models.DateField(auto_now=True)
    author = models.CharField(max_length=255,default="Anonymous")
    body = models.TextField()
    
    is_active = models.BooleanField(default=True)
    is_pinned = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
