from rest_framework import generics
from .models import Products
from .serializers import ProductsSerializer


class ProductsAPIView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
