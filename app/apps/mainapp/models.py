from django.db import models

SHORT_TEXT_MAX_LENGTH = 255
LONG_TEXT_MAX_LENGTH = 1000


class Department(models.Model):
    name = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        verbose_name='Название'
    )


class Post(models.Model):
    name = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        verbose_name='Название'
    )


class Cabinet(models.Model):
    name = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        verbose_name='Название'
    )


# class MilitaryRank(models.Model):
#     name = models.CharField(
#         max_length=SHORT_TEXT_MAX_LENGTH,
#         default='',
#         verbose_name='Название'
#     )


class Employee(models.Model):
    last_name = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        verbose_name='Фамилия'
    )

    first_name = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        verbose_name='Имя'
    )

    otchestvo = models.CharField(
        max_length=SHORT_TEXT_MAX_LENGTH,
        default='',
        blank=True, null=True,
        verbose_name='Отчество'
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Отдел')

    post = models.ForeignKey(
        Post,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Должность')

    cabinet = models.ForeignKey(
        Cabinet,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Кабинет')

