from apps.mainapp.views import *
from rest_framework.routers import DefaultRouter

mainapp_router = DefaultRouter(trailing_slash=False)
mainapp_router.register(r'main/departments', DepartmentViewSet)
mainapp_router.register(r'main/posts', PostViewSet)
mainapp_router.register(r'main/cabinets', CabinetViewSet)
mainapp_router.register(r'main/employees', EmployeeViewSet)
