from django.db import models
#
from django.contrib.auth.models import User


# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    image = models.ImageField(upload_to='recipe_images/', null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    preparation = models.TextField()
    creation_date=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    
    def __str__(self) -> str:
        return self.name
    
    