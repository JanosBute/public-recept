from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


def main_page(request):
    return render(request, "main/main.html")

@ensure_csrf_cookie
def indexPage(request):
    return render(request, 'index.html')