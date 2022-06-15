

from distutils.command import register
from django.db import models

class Members(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  age = models.SmallIntegerField(null=True)
  

class Pets(models.Model):
  member = models.ForeignKey(Members, on_delete=models.CASCADE, null=True)
  name = models.CharField(max_length=255)
  type = models.CharField(max_length=255)
  gender = models.CharField(max_length=255)
  