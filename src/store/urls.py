from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from store import views, yasg


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('register/', views.CreateUserView.as_view()),
    path('products/', views.ProductsListView.as_view()),
    path('products/<int:pk>/', views.ProductsDetailView.as_view()),
    path('review/', views.ReviewCreateView.as_view()),
    path('review/<int:pk>/', views.ReviewDetailView.as_view()),
    path('basket/', views.BasketListCreateView.as_view()),
    path('basket/<int:pk>/', views.BasketDetailView.as_view()),
    path('rating/', views.RatingCreateView.as_view()),
    path('category/', views.CategoryListView.as_view()),
    path('brand/', views.BrandListView.as_view()),
    path('discount/', views.DiscountListView.as_view()),
    path('token/access/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('docs/', yasg.schema_view.with_ui()),
]
