import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone



class UserManager(BaseUserManager):

    def create_user(self, email, password=None):

        if not email:
            raise ValueError('Users Must Have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):

        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class User(AbstractBaseUser,PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
        )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "login"

class UserProfile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, unique=False)
    last_name = models.CharField(max_length=50, unique=False)
    
    avatar = models.FileField(upload_to="avatar/",default="/default/user.png",null=True)

    phone_number = models.CharField(max_length=16, unique=True, null=False, blank=False)
    birthday = models.DateField(default=timezone.now)
    

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('B', 'Non Binary'),
        ('N', 'Do not specify')
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    
    device = models.CharField(max_length=255,default="")
    os = models.CharField(max_length=255,default="")
    ip = models.CharField(max_length=255,default="")
    ua = models.CharField(max_length=255,default="")
    
    class Meta:
        db_table = "profile"

class UserVisits(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    user = models.CharField(max_length=255)
    device = models.CharField(max_length=255)
    os = models.CharField(max_length=255)
    ip = models.CharField(max_length=255)
    ua = models.CharField(max_length=255)
    
    
        