from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=30, default="?")
    
    class Meta:
        ordering = ["category", "name"]
    def __str__(self):
        return self.name + " (" + self.category + ")"

class Recipe(models.Model):
    image = models.ImageField(upload_to='recipe_images/', default='recipe_images/default.png')
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=30, default="?")
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    preparation = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=None)

    class Meta:
        ordering = ["category", "name"]
    def __str__(self):
        return self.name + " (" + self.category + ")"
