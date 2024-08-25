from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class QuantityOfIngredient(models.Model):
    quantity=models.FloatField()
    def __str__(self):
        return str(self.quantity)
    

class Unit(models.Model):
    unit_name=models.CharField(max_length=50)

    def __str__(self):
        return self.unit_name

class Ingredients(models.Model):
    ing_name=models.CharField(max_length=50)
    unit_of_ing=models.ManyToManyField(Unit)
    quantity_of_ing=models.ManyToManyField(QuantityOfIngredient)

    def __str__(self):
        return self.ing_name
    

class Recipies(models.Model):
    name=models.CharField(max_length=50)
    creation_date=models.DateTimeField(auto_now_add=True)
    ingredients=models.ManyToManyField(Ingredients)
    description=models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    
    def __str__(self) -> str:
        return self.name
    


    

    
    