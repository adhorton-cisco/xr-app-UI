from django.db import models

class Package(models.Model):
    name = models.CharField("RPM Name", max_length=50)

    def __str__(self):
        return self.name