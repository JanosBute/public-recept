from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *

#api
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

def recipes_page(request):
    recipes = Recipies.objects.all()
    context = {"recipes":recipes}
    return render(request, "cookbook/recipes.html", context)

@login_required(login_url="/users/login/")
def new_recipe(request):
    if request.method == "POST":
        form = forms.CreateRecipe(request.POST)
        if form.is_valid():   
            newrecipe = form.save(commit=False)
            newrecipe.author = request.user
            newrecipe.save()
            return redirect("cookbook:recipes") 
    else:    
        form = forms.CreateRecipe()
    context = {"form":form}
    return render(request, "cookbook/new_recipe.html", context)

#  API

class RecipiesCreate(generics.ListCreateAPIView):
    queryset = Recipies.objects.all()
    serializer_class = RecipiesSerializer

    def delete(self, request, *args, **kwargs):
        Recipies.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RecipiesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipies.objects.all()
    serializer_class = RecipiesSerializer
    lookup_field = "pk"

        
# APIVIEW     

class RecipeList(APIView):

    def get(self, request, format=None ):
        recipes = Recipies.objects.all()
        serializer = RecipiesSerializer(recipes, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RecipiesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:        
            return Response(serializer.errors)

class RecipeDetail(APIView ):

    def get(self,request, pk, format=None):
        try:
            recipe = Recipies.objects.get(pk=pk)
        except Recipies.DoesNotExist:
            return Response({"error": "Nincs recept!"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RecipiesSerializer(recipe)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        recipe = Recipies.objects.get(pk=pk)
        serializer = RecipiesSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request,pk, format=None):
        recipe = Recipies.objects.get(pk=pk)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)