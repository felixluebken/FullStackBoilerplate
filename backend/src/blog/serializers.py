from rest_framework import serializers

from .models import Blog



class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('id','title','image','date','author','body','is_pinned',)