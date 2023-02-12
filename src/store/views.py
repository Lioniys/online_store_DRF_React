from rest_framework import generics
from .permissions import IsAdminOrReadOnly
from .models import Product
from .serializers import (
    ProductsListSerializer,
    ProductsDetailSerializer,
)


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsListSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsDetailSerializer
    permission_classes = (IsAdminOrReadOnly,)
