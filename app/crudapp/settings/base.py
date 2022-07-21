import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party apps
    'rest_framework',
    'django_filters',
    # Internal apps
    'apps.mainapp.apps.MainappConfig'
]

# "DATE_INPUT_FORMATS": ['iso-8601', '%d.%m.%Y', '%d.%m.%Y %H:%M'],

DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
)

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
]

ROOT_URLCONF = 'crudapp.urls'
APPEND_SLASH = True

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
            ],
        },
    },
]

WSGI_APPLICATION = 'crudapp.wsgi.application'

USE_I18N = True
LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'
DEFAULT_TIMEZONE = 'Europe/Moscow'
USE_TZ = True

USE_L10N = False

STATIC_URL = '/static/'

# Директория в корне для сбора всех статических файлов
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, 'resources'),
]
