from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .services import increment_counter_rating_product_star, save_rating_product
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .models import (
    Product,
    Review,
    RatingUserProduct,
    Basket,
    BasketProduct
)
from .serializers import (
    ProductsListSerializer,
    ProductsDetailSerializer,
    ReviewCreateSerializer,
    ReviewDetailSerializer,
    RatingCreateSerializer,
    BasketAddSerializer,
    BasketDetailSerializer,
    BasketListSerializer,
    UserSerializer,
)


class ProductsListView(generics.ListCreateAPIView):
    """Список товаров"""
    queryset = Product.objects.filter(in_store=True)
    serializer_class = ProductsListSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['category', 'brand']
    search_fields = ['name']
    ordering_fields = ['price']


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Товар"""
    queryset = Product.objects.filter(in_store=True)
    serializer_class = ProductsDetailSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ReviewCreateView(generics.CreateAPIView):
    """Создание отзыва"""
    queryset = Review.objects.all()
    serializer_class = ReviewCreateSerializer
    permission_classes = (IsAuthenticated,)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Отзыв"""
    queryset = Review.objects.all()
    serializer_class = ReviewDetailSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class BasketListView(generics.ListCreateAPIView):
    """Список товаров в корзине пользователя"""
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        basket_obj, created = Basket.objects.get_or_create(user=user)
        # Создается корзина если её не было
        if self.request.method == 'POST':
            return BasketProduct.objects.all()
        return BasketProduct.objects.filter(basket=basket_obj)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BasketAddSerializer
        return BasketListSerializer


class BasketDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Конкретный товар в корзине"""
    queryset = BasketProduct.objects.all()
    serializer_class = BasketDetailSerializer
    permission_classes = (IsAuthenticated,)


class RatingCreateView(generics.CreateAPIView):
    """Добавление оценки рейтинга"""
    queryset = RatingUserProduct.objects.all()
    serializer_class = RatingCreateSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        product = serializer.validated_data.get('product')
        star = serializer.validated_data.get('star')
        user = self.request.user
        # Проверка ставил ли пользователь уже оценку
        queryset = RatingUserProduct.objects.filter(user=user, product=product)
        if queryset.exists():
            raise serializers.ValidationError('The object has already been created')
        serializer.save()
        increment_counter_rating_product_star(product=product, star=star)
        save_rating_product(product=product)


class CreateUserView(generics.CreateAPIView):
    model = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
