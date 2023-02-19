from rest_framework import generics
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from .services import get_rating_product
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .models import Product, Review, RatingUserProduct, RatingProductStar, Basket
from .serializers import (
    ProductsListSerializer,
    ProductsDetailSerializer,
    ReviewCreateSerializer,
    ReviewDetailSerializer,
    RatingCreateSerializer,
    BasketAddSerializer,
)


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsListSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsDetailSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewCreateSerializer
    permission_classes = (IsAuthenticated,)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewDetailSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class BasketAddView(generics.ListAPIView):
    serializer_class = BasketAddSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Basket.objects.filter(user=user)


class RatingCreateView(generics.CreateAPIView):
    queryset = RatingUserProduct.objects.all()
    serializer_class = RatingCreateSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        product = serializer.validated_data.get('product')
        star = serializer.validated_data.get('star')

        queryset = RatingUserProduct.objects.filter(user=self.request.user, product=product)
        if queryset.exists():
            raise serializers.ValidationError('The object has already been created')

        serializer.save()

        obj, created = RatingProductStar.objects.update_or_create(product=product, star=star)
        obj.count += 1
        obj.save()

        queryset = RatingProductStar.objects.filter(product=product)
        rating = get_rating_product(queryset)
        obj = Product.objects.get(pk=product.pk)
        obj.rating = rating
        obj.save()
