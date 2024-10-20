from django.shortcuts import render
#
from .models import *
from .serializers import *
from rest_framework import generics
#
from django.http import JsonResponse
from django.db.models import Q


# Create your views here.

class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class RecipeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

def search_recipes(request):
    query = request.GET.get('query', '')
    if query:
        # Keresés a receptek nevében, vagy az összetevők nevében
        recipes = Recipe.objects.filter(
            Q(name__icontains=query) | 
            Q(ingredients__name__icontains=query)  # Keresés az ingredients nevén keresztül
        ).distinct()

        recipe_list = [
            {
                'id': recipe.id,
                'name': recipe.name,
                'description': recipe.description,
                'image': recipe.image.url,
                'ingredients': [{'id': ing.id, 'name': ing.name} for ing in recipe.ingredients.all()],
                'preparation': recipe.preparation
            }
            for recipe in recipes        
        ]
        return JsonResponse(recipe_list, safe=False)
    else:
        return JsonResponse([], safe=False)