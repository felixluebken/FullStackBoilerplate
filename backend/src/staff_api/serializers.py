from rest_framework import serializers
from user.models import UserProfile,UserVisits,User
from blog.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
    def create(self,validated_data):
        title=validated_data.pop("title")
        author=validated_data.pop("author")
        body=validated_data.pop("body")
        is_pinned=validated_data.pop("is_pinned")
        
        if is_pinned == "false": is_pinned = False
        else: is_pinned = True
        
        try:
            image=validated_data.pop('image') 
            object = Blog.objects.create(
                title=title,
                image_thumbnail_big=image,
                image_thumbnail_small=image,
                image=image,
                author=author,
                body=body,
                is_pinned=is_pinned
            )
        except Exception as err:
            object = Blog.objects.create(
                title=title,
                author=author,
                body=body,
                is_pinned=is_pinned
            )
            
        return object


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVisits
        fields = '__all__'