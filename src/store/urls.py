from django.urls import path
from store.views import (
    ProductsListView,
    ProductsDetailView,
    ReviewCreateView,
    ReviewDetailView,
)


urlpatterns = [
    path('products/', ProductsListView.as_view()),
    path('products/<int:pk>/', ProductsDetailView.as_view()),
    path('review/', ReviewCreateView.as_view()),
    path('review/<int:pk>/', ReviewDetailView.as_view()),
]
