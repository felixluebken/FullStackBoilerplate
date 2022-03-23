import json
from multiprocessing import log_to_stderr
from os import device_encoding
from django.contrib.auth import logout
from django.http import QueryDict
from django.core import serializers

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated




from .serializers import UserRegistrationSerializer,UserLoginSerializer,StaffLoginSerializer
from .models import User, UserProfile, UserVisits
from datetime import date

def visitor_ip_address(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def log_user_visit(request,email):
    UserVisits.objects.create(
        user    = email,
        device  = request.user_agent.browser.family+" "+request.user_agent.browser.version_string,
        os      = request.user_agent.os.family+" "+request.user_agent.os.version_string,
        ip      = visitor_ip_address(request),
        ua      = request.META['HTTP_USER_AGENT']
    )
    
    
    
    user = User.objects.get(email=email).id
    user_profile = UserProfile.objects.get(user=user)
    user_profile.device  = request.user_agent.browser.family+" "+request.user_agent.browser.version_string,
    user_profile.os      = request.user_agent.os.family+" "+request.user_agent.os.version_string,
    user_profile.ip      = visitor_ip_address(request),
    user_profile.ua      = request.META['HTTP_USER_AGENT']
    user_profile.save()
    
    

class LogUserVisitView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        log_user_visit(request,request.user.email)
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged'
        }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
        

class UserRegistrationView(CreateAPIView):
    
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        print(request.data)
        if User.objects.filter(email = request.data['email']).exists():
            
            user = User.objects.get(email = request.data['email'])
            if not UserProfile.objects.filter(user=user):
                print(request.data)

                profile = UserProfile.objects.create(
                    user=user,
                    first_name=request.data['profile.first_name'],
                    last_name=request.data['profile.last_name'],
                    birthday=request.data['profile.birthday'],
                    gender=request.data['profile.gender'],
                    phone_number=request.data['profile.phone_number'],
                    age=0,
                    is_verified_organizer=False ,           #set as false by default
                )

                
                log_user_visit(request,request.data['email'])
                
                if request.data["profile.avatar"] != "null":
                    profile.avatar = request.data["profile.avatar"]
                profile.save()
                
                status_code = status.HTTP_201_CREATED
                response = {
                    'success' : 'True',
                    'status code' : status_code,
                    'message': 'User registered  successfully',
                    'data': {
                        'email':request.data["email"],
                        'id':profile.id,
                        'first_name':profile.first_name,
                        'last_name':profile.last_name,
                        'avatar':str(profile.avatar.url),
                        'phone':profile.phone_number,
                        'birthday':profile.birthday,
                    }
                }
            else:
                status_code = status.HTTP_208_ALREADY_REPORTED
                response = {
                    'success' : 'False',
                    'status code' : status_code,
                    'message': 'Email already in use'
                }
        elif UserProfile.objects.filter(phone_number=request.data['profile.phone_number']):
            status_code = status.HTTP_208_ALREADY_REPORTED
            response = {
                'success' : 'False',
                'status code' : status_code,
                'message': 'Phone number already in use'
            }
        else:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=False)
            serializer.save()
            
            email = serializer.data["email"]
            
            user = User.objects.get(email=email)
            profile = UserProfile.objects.get(user=user)            
            
            log_user_visit(request,serializer.data['email'])
            
            if request.data["profile.avatar"] != "null":
                profile.avatar = request.data["profile.avatar"]
                profile.save()

            status_code = status.HTTP_201_CREATED
            response = {
                'success' : 'True',
                'status code' : status_code,
                'message': 'User registered  successfully',
                'data': {
                    'email':email,
                    'id':profile.id,
                    'first_name':profile.first_name,
                    'last_name':profile.last_name,
                    'avatar':str(profile.avatar.url),
                    'phone':profile.phone_number,
                    'birthday':profile.birthday,
                }
            }
        
        return Response(response, status=status_code)
    
class UserLoginView(APIView):

    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    queryset = User.objects.all()
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.data["email"]
            
        user = User.objects.get(email=email)
        profile = UserProfile.objects.get(user=user)
        
        log_user_visit(request,serializer.data['email'])
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'data': {
                'email' : serializer.data['email'],
                'id':profile.id,
                'first_name':profile.first_name,
                'last_name':profile.last_name,
                'avatar':str(profile.avatar),
                'phone':profile.phone_number,
                'birthday':profile.birthday,
            }
            
        }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
    
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        logout(request)
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged out  successfully',
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
        


class StaffLoginView(APIView):

    permission_classes = [AllowAny]
    serializer_class = StaffLoginSerializer
    queryset = User.objects.all()
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Staff logged in  successfully',
            'email' : serializer.data['email'],
            }
        status_code = status.HTTP_200_OK
        print(serializer.data)
        log_user_visit(request,serializer.data['email'])
        
        return Response(response, status=status_code)
    
class StaffLogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        logout(request)
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Staff logged out  successfully',
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)