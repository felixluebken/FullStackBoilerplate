from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent


# GET RID OF THIS IN PRODUCTION
SECRET_KEY = 'django-insecure-a5mrbu2=nt0%*=ll^mplc3ba9%&apueup*u!^2ysi7q^gmf1xq'

# SET AS FALSE IN PRODUCTION
DEBUG = True

# MODIFY THIS IN PRODUCTION, THIS IS TO AVOID ANY ANNOYING CORS ISSUES IN DEVELOPMENT
ALLOWED_HOSTS=['*']
CORS_ORIGIN_ALLOW_ALL = True   
CORS_ALLOWED_ORIGINS = ['http://127.0.0.1:8001', 'http://localhost:8001','http://127.0.0.1:3000', 'http://localhost:3000']

# PUT ALL OF YOUR INSTALLED APPS HERE
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # ADD ANY 3RD PARTY APPS HERE
    'rest_framework',
    'corsheaders',
    'django_user_agents',
    'oauth2_provider',
    'social_django',
    'drf_social_oauth2',
    'imagekit',
    
    # ADD ANY APPS CREATED YOURSELF IN HERE
    'user',
    'blog',
    'staff_api',
]


# TRY TO NOT REMOVE ANY MIDDLEWARE, ONLY ADD IF YOU HAVE TO
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_user_agents.middleware.UserAgentMiddleware',        
    'csp.middleware.CSPMiddleware',
]


ROOT_URLCONF = 'src.urls'

# TRY TO NOT REMOVE ANY TEMPLATES, ONLY ADD IF YOU HAVE TO
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

# THIS IS IMPORTANT FOR THE WSGI CONFIG WHEN GOING LIVE WITH NGINX
WSGI_APPLICATION = 'src.wsgi.application'



# USES BASIC SQLITE DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# IN PRODUCTION REPLACE THE ABOVE WITH THE COMMENTED CODE BELOW. CONFIGURE A MYSQL AWS RDS INSTANCE AND LINK IT TO THIS BACKEND.
'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': ''
    }
}
'''



# TRY TO NOT REMOVE ANY OPTIONS HERE, ONLY ADD IF YOU HAVE TO
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
            'rest_framework.permissions.IsAdminUser',
        ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
            'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
            'drf_social_oauth2.authentication.SocialAuthentication',
        )
}


# THESE ARE SECURITY OPTIONS, WHICH NEED TO BE UNCOMMENTED IN PRODUCTION
'''
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

CSP_DEFAULT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'",)
CSP_IMG_SRC = ("'self'",)
CSP_FONT_SRC = ("'self'",)

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_SSL_REDIRECT = True
'''






AUTH_USER_MODEL = 'user.User'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

OAUTH2_PROVIDER = {
    'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore',
}

# A TEMPLATE FOR APPLE AND GOOGLE AUTHENTICATION
'''
# Google configuration
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ""
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ""

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

# Apple configuration
SOCIAL_AUTH_APPLE_ID_CLIENT = ''    # Your client_id com.application.your, aka "Service ID"
SOCIAL_AUTH_APPLE_ID_TEAM = ''               # Your Team ID, ie K2232113
SOCIAL_AUTH_APPLE_ID_KEY = ''                # Your Key ID, ie Y2P99J3N81K
SOCIAL_AUTH_APPLE_ID_SECRET = """
-----BEGIN PRIVATE KEY-----
PRIVATE APPLE KEY...
-----END PRIVATE KEY-----"""

SOCIAL_AUTH_APPLE_ID_SCOPE = ['email', 'name']
SOCIAL_AUTH_APPLE_ID_EMAIL_AS_USERNAME = True   # If you want to use email as username
'''



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CURRENTLY ALL ASSETS WILL BE UPLOADED TO /media. IN PRODUCTION USE A S3 BUCKET USING THE CODE BELOW
'''
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_STORAGE_BUCKET_NAME = ''
AWS_S3_SIGNATURE_VERSION = ''
AWS_S3_REGION_NAME = 'eu-central-1'
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
AWS_S3_VERIFY = True
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' 
'''


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
