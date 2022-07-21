from .base import *  # подгружаем настройки по умолчанию

# SECRET_KEY = '***SECRET***'
SECRET_KEY = os.environ.get("SECRET_KEY")
DISABLE_AUTHENTICATION = True
# ALLOWED_HOSTS = ['*']
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

DEFAULT_RENDERER_CLASSES = DEFAULT_RENDERER_CLASSES + (
    'rest_framework.renderers.BrowsableAPIRenderer',
)

# DEBUG = True
DEBUG = int(os.environ.get("DEBUG", default=0))

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES,
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DATE_INPUT_FORMATS': ['iso-8601', '%d.%m.%Y'],
    'DATETIME_INPUT_FORMATS': ['iso-8601', '%d.%m.%Y %H:%M'],
}

DEBUG_FRONTED = False
STATICFILES_DIRS.append(os.path.join(BASE_DIR, 'to_static'))

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'crudapp_db',
#         'USER': 'postgres',
#         'PASSWORD': '123456qQ',
#         'HOST': 'localhost',
#         'PORT': '5432'
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("DB_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("DB_NAME", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("DB_USER", "user"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "password"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}
