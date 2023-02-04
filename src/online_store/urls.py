from django.contrib import admin
from django.urls import path, include
from store.views import ProductsViewSet
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'products', ProductsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls')),
]
