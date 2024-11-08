from django.shortcuts import render
# API
from django.urls import reverse
from django.http import JsonResponse

def indexPage(request):
    return render(request, 'index.html')

# API
def auth_urls(request):         #  Django url-ek
    urls = {
        "login_url": reverse("users:login"),
        "logout_url": reverse("users:logout"),
        "register_url": reverse("users:register"),
    }
    return JsonResponse(urls)

def user_status(request):       # Felhasználó be van e lépve
    return JsonResponse({"is_authenticated": request.user.is_authenticated})
