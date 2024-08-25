from django import forms
from . import models

class CreateRecipe(forms.ModelForm):
    class Meta:
        model = models.Recipies
        fields = ["name", "ingredients", "description"]