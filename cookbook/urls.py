from django.urls import path
from .views import *


app_name = 'cookbook'

# Generics API
urlpatterns = [
    path('ingredients/', IngredientListCreateView.as_view(), name='ingredient-list'),
    path('ingredients/<int:pk>/', IngredientDetailView.as_view(), name='ingredient-detail'),
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeRetrieveUpdateDestroyView.as_view(), name='recipe-detail'),
    path('recipes/my/', RecipeMyListView.as_view(), name='recipe-my-list'),  # Saját receptek végpont
    path('search-recipes/', search_recipes, name='search-recipes'),
]
