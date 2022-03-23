from datetime import date,datetime
from django.db.models import Count,Sum
from django.core import serializers
from rest_framework import status,viewsets,parsers
from rest_framework.views import APIView

from rest_framework.permissions import BasePermission,AllowAny
from rest_framework.response import Response

from user.models import UserProfile,UserVisits,User
from blog.models import Blog

from .serializers import UserSerializer,UserVisitSerializer,UserProfileSerializer,BlogSerializer

import json

def get_age(birthday):
    birthday_parts = str(birthday).split("-")
    
    birthday = date(int(birthday_parts[0]),int(birthday_parts[1]),int(birthday_parts[2]))
    
    
    
    today = date.today().strftime('%Y-%m-%d')  
    today_parts = str(today).split("-")
    
    return int(today_parts[0]) - int(birthday_parts[0]) - ((int(today_parts[1]), int(today_parts[2])) < (int(birthday_parts[1]), int(birthday_parts[2])))

def get_age_list():
    age_list = {}
    for i in range(120):
        age_list[i] = 0
        
    
    
    age = UserProfile.objects.all() \
        .extra({'key':"date(birthday)"}) \
        .values('key') \
        .annotate(count=Count("id"))
        
    for item in age:
        calculated_age = get_age(item["key"])
        age_list[int(calculated_age)] = age_list[calculated_age] + item["count"]
    
    
    return age_list

def convert_to_dict(items):
    ordered_items = {}
    for item in items:
        ordered_items[str(item["key"])] = item["count"]
    return ordered_items


def get_dashboard_data():
    visits = UserVisits.objects.all() \
        .extra({'key':"date(timestamp)"}) \
        .values('key') \
        .annotate(count=Count("id"))
        
    gender = UserProfile.objects.all() \
        .extra({'key':"gender"}) \
        .values('key') \
        .annotate(count=Count("id"))
        

    response = {
        "general_stats": {
            "web_visits": convert_to_dict(list(visits)),
        },
        "user_stats": {
            "gender": convert_to_dict(list(gender)), 
            "age": get_age_list(),  
            "users": json.loads(serializers.serialize("json", UserProfile.objects.all()))
        }
    }
        
    
    
    return response




class IsStaffUser(BasePermission):
    
    def has_permission(self,request,view):
        return request.user and request.user.is_staff  

class AuthView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        
        email = request.user.email
        id = request.user.id

        profile = UserProfile.objects.get(user=request.user)

        try:
            profile = UserProfile.objects.get(user=request.user)
            response = {
                'success' : 'True',
                'status code' : status.HTTP_200_OK,
                'user': {
                    'id':id,
                    'email': email,
                    'first_name': profile.first_name,
                    'last_name': profile.last_name
                }
            }
            status_code = status.HTTP_200_OK
        except:
            response = {
                'success' : 'False',
                'status code' : status.HTTP_401_UNAUTHORIZED,
                'message' : 'Not authenticated'
            }
            status_code = status.HTTP_401_UNAUTHORIZED
        
        
        
        
        return Response(response, status=status_code)
    
class DashboardView(APIView):
    permission_classes = [IsStaffUser]

    def get(self, request):
        try:            
            response = {
                'success' : 'True',
                'status code' : status.HTTP_200_OK,
                'data': get_dashboard_data()
            }
            status_code = status.HTTP_200_OK
        except Exception as err:
            print(err)
            response = {
                'success' : 'False',
                'status code' : status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message' : 'Error fetching data'
            }
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        
        
        
        
        return Response(response, status=status_code)
    
class BlogView(viewsets.ModelViewSet):
    permission_classes = [IsStaffUser]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    
    
    def post(self,request):
        try:
            method = request.data["method"]
            if method == "add":
                serializer = self.serializer_class(data=request.data)
                serializer.is_valid(raise_exception=False)
                serializer.save()                
                
                
                status_code = status.HTTP_201_CREATED
                success = 'True'
                message = 'Item added successfully'
            elif method == "delete":
                ids = request.data["ids"].split(",")
                for id in ids:
                    Blog.objects.filter(id=id).delete()
            
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'Item(s) deleted successfully'
            elif method == "edit":
                item = Blog.objects.get(id=request.data["id"])
                
                item.title = request.data["title"]
                item.author = request.data["author"]
                item.body = request.data["body"]
                if request.data["is_pinned"] == "true": item.is_pinned = True
                else: item.is_pinned = False
                
                if request.data["image"] != "null":
                    item.image = request.data["image"]
                    item.image_thumbnail_small = request.data["image"]
                    item.image_thumbnail_big = request.data["image"]
                    
                item.save()     
                status_code = status.HTTP_200_OK
                success = 'True' 
                message = 'Item edited successfully'     
                
            elif method == "toggle_active":
                print(request.data)
                
                blog = Blog.objects.get(id=request.data["id"])
                blog.is_active = not blog.is_active 
                blog.save()    
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'Blog updated successfully'    

                  
        except Exception as err:
                print(err)
                status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                success = 'False'
                message = 'Something went wrong'
        
        response = {
            'success' : success,
            'status code' : status_code,
            'message': message
        }
        return Response(response,status=status_code)



class UserView(viewsets.ModelViewSet):
    permission_classes = [IsStaffUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def post(self,request):
        try:
            method = request.data["method"]
            user = User.objects.get(email=request.data["email"])
            if method == "toggle_staff":
                user.is_staff = not user.is_staff
                user.save()
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'User updated successfully'
                 
            elif method == "toggle_active":
                user.is_active = not user.is_active 
                user.save()    
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'User updated successfully'
                            
            elif method == "toggle_verified":
                profile = UserProfile.objects.get(user=user)
                profile.is_verified_organizer = not profile.is_verified_organizer
                profile.save()
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'User updated successfully'
          
            elif method == "toggle_organizer":
                profile = UserProfile.objects.get(user=user)
                profile.is_organizer = not profile.is_organizer
                profile.save()
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'User updated successfully'
                 
            elif method == "delete":
                user.delete()
                status_code = status.HTTP_200_OK
                success = 'True'
                message = 'User deleted successfully'
                 
        except Exception as err:
                print(err)
                status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                success = 'False'
                message = 'Something went wrong'
        
        response = {
            'success' : success,
            'status code' : status_code,
            'message': message
        }
        return Response(response,status=status_code)
        
class UserProfileView(viewsets.ModelViewSet):
    permission_classes = [IsStaffUser]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    
class UserVisitView(viewsets.ModelViewSet):
    permission_classes = [IsStaffUser]
    serializer_class = UserVisitSerializer
    queryset = UserVisits.objects.all()