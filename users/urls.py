from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path('register/', views.register_page, name="register"),
    path("login/", views.login_page, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register_success/", views.register_success_view, name="register-success"),
    path("logout_success", views.logout_success, name="logout-success")
    
]
