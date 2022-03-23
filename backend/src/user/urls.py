from django.urls import re_path,include
from .views import UserRegistrationView,UserLoginView,UserLogoutView,StaffLoginView,StaffLogoutView,\
    LogUserVisitView


urlpatterns = [
    re_path(r'^user/signup', UserRegistrationView.as_view()),
    re_path(r'^user/signin', UserLoginView.as_view()),
    re_path(r'^user/signout', UserLogoutView.as_view()),
    re_path(r'^user/log', LogUserVisitView.as_view()),

    re_path(r'^staff/signin', StaffLoginView.as_view()),
    re_path(r'^staff/signout', StaffLogoutView.as_view()),    
]

