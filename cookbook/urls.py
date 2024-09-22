from django.urls import path
from . import views

app_name = "cookbook"

urlpatterns = [
    #Generics api
    path('recipes/', views.RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', views.RecipeRetrieveUpdateDestroyView.as_view(), name='recipe-detail'),
    path('ingredients/', views.IngredientListCreateView.as_view(), name='ingredient-list-create'),
    path('units/', views.UnitListCreateView.as_view(), name='unit-list-create'),
]
