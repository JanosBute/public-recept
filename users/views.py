from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib import messages

# API 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.
 
def register_page(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            messages.success(request, 'Sikeres regisztráció.')
            login(request, form.save())
            return redirect("users:register-success")
    else:
        form = UserCreationForm()

    context = {"form":form}    
    return render(request, "users/register.html", context)
        
def login_page(request):
    if request.method == "POST":
        form = AuthenticationForm(data = request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("/")
    else:
        form = AuthenticationForm()

    context = {"form":form}    
    return render(request, "users/login.html", context)

def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("users:logout-success")
    
def register_success_view(request):
    return render(request, "users/register_success.html")

def logout_success(request):
    return render(request, "users/logout.html")

# API a bejelnetkezési állapot lekérdezéséshez

class UserStatusView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({"is_authenticated": True,
                             "username": request.user.username,
                             "is_admin": request.user.is_staff or request.user.is_superuser})
        else:
            return Response({"is_authenticated": False})