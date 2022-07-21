from rest_framework import serializers
from apps.mainapp.models import *


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CabinetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cabinet
        fields = '__all__'


# class MilitaryRankSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MilitaryRank
#         fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
