from django.urls import re_path
from .views import AuthView,UserView,UserVisitView,UserProfileView,BlogView,DashboardView



urlpatterns = [
    re_path(r'^auth/', AuthView.as_view()),
    re_path(r'^dashboard/', DashboardView.as_view()),
    re_path(r'^blog/',BlogView.as_view({'get':'list'})),
    
    re_path(r'^user/',UserView.as_view({'get':'list'})),
    re_path(r'^userprofile/',UserProfileView.as_view({'get':'list'})),
    re_path(r'^uservisit/',UserVisitView.as_view({'get':'list'})),
    

]
