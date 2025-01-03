from django.shortcuts import render

#
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions
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

    def get_queryset(self):
        queryset = Recipe.objects.all()
        ingredient_ids = self.request.query_params.get('ingredients')
        if ingredient_ids:
            ingredient_ids = ingredient_ids.split(',')
            queryset = queryset.filter(ingredients__id__in=ingredient_ids).distinct()
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class RecipeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Recipe.objects.all() 
    serializer_class = RecipeSerializer 
    
    def get_queryset(self): 
        user = self.request.user
        if user.is_superuser or user.is_staff:
            return Recipe.objects.all()  # Admin felhasználó minden receptet lát
        return Recipe.objects.filter(author=user)  # Normál felhasználó csak a sajátjait látja

class RecipeMyListView(generics.ListAPIView):   # A felhasználó receptjei
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(author=self.request.user)


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