from rest_framework import serializers
from .models import Ingredient, Recipe

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'category']  # Csak az id és a név mezők megjelenítése

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    ingredients = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all(), many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def to_representation(self, instance):
        # Az eredeti reprezentáció (dict) lekérése
        representation = super().to_representation(instance)
        
        # Az összetevőket az IngredientSerializer segítségével részletesen jelenítjük meg
        representation['ingredients'] = IngredientSerializer(instance.ingredients, many=True).data
        return representation

