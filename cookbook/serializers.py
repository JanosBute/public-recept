from rest_framework import serializers
from .models import Recipe, Ingredient, Unit, RecipeIngredient

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ['id', 'unit_name']

    def create(self, validated_data):
        # Ellenőrizzük, hogy a mértékegység létezik-e
        unit, created = Unit.objects.get_or_create(name=validated_data['unit_name'])
        return unit
    
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'ing_name']

    def create(self, validated_data):
        # Ellenőrizzük, hogy az összetevő létezik-e
        ingredient, created = Ingredient.objects.get_or_create(name=validated_data['name'])
        return ingredient


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    unit = UnitSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'quantity', 'unit']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(source='recipeingredient_set', many=True)
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Recipe
        fields = ['id','image', 'name', 'description', 'creation_date', 'author', 'ingredients']