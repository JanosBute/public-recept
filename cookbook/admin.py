from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Recipies)
admin.site.register(QuantityOfIngredient)
admin.site.register(Unit)
admin.site.register(Ingredients)
