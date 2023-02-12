from rest_framework import serializers
from .models import Product


class ProductsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ['category', 'brand']


class ProductsDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    brand = serializers.CharField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
