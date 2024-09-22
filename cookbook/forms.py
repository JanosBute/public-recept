from django import forms
from . import models

class RecipeForm(forms.ModelForm):
    class Meta:
        model = models.Recipe
        fields = ["name", "description",]

class IngredientsForm(forms.ModelForm):
    class Meta:
        model = models.Ingredient
        fields = ["ing_name"]

class RecipeIngredientForm(forms.ModelForm):
    class Meta:
        model = models.RecipeIngredient
        fields = ["ingredient", "quantity", "unit"]

class UnitForm(forms.ModelForm):
    class Meta:
        model = models.Unit
        fields = ["unit_name"]
