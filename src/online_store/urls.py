from django.contrib import admin
from django.urls import path, include
from store.views import ProductsAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', ProductsAPIView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
]
