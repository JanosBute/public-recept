from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Unit(models.Model):
    unit_name=models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.unit_name
    
class Ingredient(models.Model):
    ing_name=models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.ing_name
    
class Recipe(models.Model):
    image = models.ImageField(upload_to='recipe_images/', null=True, blank=True)
    name=models.CharField(max_length=50)
    description=models.TextField()
    creation_date=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    
    def __str__(self) -> str:
        return self.name
    
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} {self.unit} of {self.ingredient} in {self.recipe}"

    


    

    
    