from rest_framework import serializers
from .models import *

class QuantityOfingredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantityOfIngredient
        fields = "__all__"
        
class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"
        
class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = "__all__"
        
class RecipiesSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Recipies
        fields = "__all__"
        depth = 2

