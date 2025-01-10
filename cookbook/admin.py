from django.contrib import admin
from .models import Ingredient, Recipe
from django.db.models import F

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    search_fields = ['name', 'category']

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        qs = qs.annotate(name_collated=F('name')).order_by('name_collated')
        return qs

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'author', 'creation_date']
    search_fields = ['name', 'category', 'author__username']
    filter_horizontal = ['ingredients']

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        qs = qs.annotate(name_collated=F('name')).order_by('name_collated')
        return qs