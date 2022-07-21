from rest_framework.viewsets import ModelViewSet
from apps.mainapp.serializers import *


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CabinetViewSet(ModelViewSet):
    queryset = Cabinet.objects.all()
    serializer_class = CabinetSerializer


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
