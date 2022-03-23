from django.contrib import admin

from .models import UserProfile,UserVisits,User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','is_staff','id')
    
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user','id','first_name','last_name','birthday','gender')
    
class UserVisitsAdmin(admin.ModelAdmin):
    list_display = ('timestamp','user','device','os','ip','ua')
    

admin.site.register(User,UserAdmin)
admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(UserVisits,UserVisitsAdmin)