from django.shortcuts import render

def indexPage(request):
    return render(request, 'index.html')

def mainPage(request):
    return render(request, 'main/main.html')