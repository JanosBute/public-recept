from django.urls import path
from .views import *

app_name = "users"

urlpatterns = [
    path('register/', register_page, name="register"),
    path("login/", login_page, name="login"),
    path("logout/", logout_view, name="logout"),
    path("register_success/", register_success_view, name="register-success"),
    path("logout_success", logout_success, name="logout-success"),
    # API
    path("api/", UserStatusView.as_view(), name="user-status")
]
