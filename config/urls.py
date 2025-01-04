
from django.contrib import admin
from django.urls import path, include, re_path
#
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', indexPage),
    path('cookbook/', include('cookbook.urls')),
    path('users/', include('users.urls')),
    # API a felhasználóhoz
    path('user-status/', user_status),
    # és a Django template-ekhez
    path('auth-urls/', auth_urls),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

