import profile
import uuid
import datetime

from django.contrib.auth import authenticate
from datetime import date
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import UserProfile, User





def convert_to_age(birthday):
    today = date.today()
    return today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'birthday', 'gender','phone_number','avatar')

class UserRegistrationSerializer(serializers.ModelSerializer):

    profile = UserSerializer(required=False)

    class Meta:
        model = User
        fields = ('email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):        
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        
        age = convert_to_age(profile_data['birthday'])
        
        UserProfile.objects.create(
            user=user,
            first_name=profile_data['first_name'],
            last_name=profile_data['last_name'],
            birthday=profile_data['birthday'],
            gender=profile_data['gender'],
            phone_number=profile_data['phone_number'],
        )
            
        
        return {
            'email':user.email
        }
    
class UserLoginSerializer(serializers.Serializer):
    
    
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    
    
    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
                
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        try:
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )

        token = Token.objects.get_or_create(user=user)
    
        
        return {
            'id':user.id,
            'email':user.email,
            'token': token[0]
        }



class StaffLoginSerializer(serializers.Serializer):
    
    
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    
    
    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)

        
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        try:
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        
        if not user.is_staff:
            raise serializers.ValidationError(
                'Not a staff member.'
            )
            
        

        token = Token.objects.get_or_create(user=user)
        
        return {
            'id':user.id,
            'email':user.email,
            'token': token[0]
        }
    