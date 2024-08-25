from django.urls import path
from . import views

app_name = "cookbook"

urlpatterns = [
    path('', views.recipes_page, name="recipes"),
    path("new_recipe/", views.new_recipe, name="new-recipe"),
    path("api/", views.RecipiesCreate.as_view(), name="recipies-create"),
    path("api/<int:pk>/", views.RecipiesRetrieveUpdateDestroy.as_view(), name="update"),
    path("api2/", views.RecipeList.as_view(), name="recipe-list"),
    path("api2/<int:pk>/", views.RecipeDetail.as_view(), name="recipe-detail"),
]
