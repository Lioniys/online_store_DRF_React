from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from online_store import settings
from store.views import ProductsListView, ProductsDetailView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('products/', ProductsListView.as_view()),
    path('products/<int:pk>/', ProductsDetailView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
