from rest_framework import generics
from .models import Product
from .serializers import ProductsSerializer


class ProductsListAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer





