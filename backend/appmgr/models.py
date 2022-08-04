from django.db import models
from django.core.files.storage import FileSystemStorage

class Package(models.Model):
    name = models.CharField("RPM Name", max_length=50)
    package = models.FileField(upload_to='packages', default='default.txt')

    def __str__(self):
        return self.name