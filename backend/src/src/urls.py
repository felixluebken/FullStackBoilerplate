from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('user.urls')),
    path('staff/', include('staff_api.urls')),
    path('oauth2/',include('drf_social_oauth2.urls',namespace='drf')) #for social auth & tokens
]
