from django.urls import path
from store import views, yasg


urlpatterns = [
    path('register/', views.CreateUserView.as_view()),
    path('products/', views.ProductsListView.as_view()),
    path('products/<int:pk>/', views.ProductsDetailView.as_view()),
    path('review/', views.ReviewCreateView.as_view()),
    path('review/<int:pk>/', views.ReviewDetailView.as_view()),
    path('basket/', views.BasketListCreateView.as_view()),
    path('basket/<int:pk>/', views.BasketDetailView.as_view()),
    path('rating/', views.RatingCreateView.as_view()),
]

urlpatterns += yasg.urlpatterns
