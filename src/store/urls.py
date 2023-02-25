from django.urls import path
from .yasg import urlpatterns as doc_urls
from store.views import (
    ProductsListView,
    ProductsDetailView,
    ReviewCreateView,
    ReviewDetailView,
    RatingCreateView,
    BasketListView,
    BasketDetailView,
    CreateUserView,
)


urlpatterns = [
    path('products/', ProductsListView.as_view()),
    path('products/<int:pk>/', ProductsDetailView.as_view()),
    path('review/', ReviewCreateView.as_view()),
    path('review/<int:pk>/', ReviewDetailView.as_view()),
    path('rating/', RatingCreateView.as_view()),
    path('basket/', BasketListView.as_view()),
    path('basket/<int:pk>/', BasketDetailView.as_view()),
    path('register/', CreateUserView.as_view()),
]

urlpatterns += doc_urls
