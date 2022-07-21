from django.conf.urls import include
from django.urls import path

from apps.mainapp.urls import *
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.registry.extend(mainapp_router.registry)

urlpatterns = [
    path('', index),
    path('api/', include(router.urls)),
]
