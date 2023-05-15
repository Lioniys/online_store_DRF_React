from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from .services import add_product_in_basket, add_rating
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .models import Product, Review, Basket, BasketProduct, RatingUserProduct
from .serializers import (
    ProductsListSerializer,
    ProductsDetailSerializer,
    ReviewCreateSerializer,
    ReviewDetailSerializer,
    RatingCreateSerializer,
    BasketSerializer,
    BasketDetailSerializer,
    UserSerializer,
)


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(in_store=True)
    serializer_class = ProductsListSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['category', 'brand']
    search_fields = ['name']
    ordering_fields = ['price']

    @method_decorator(cache_page(60 * 15))
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.filter(in_store=True)
    serializer_class = ProductsDetailSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewCreateSerializer
    permission_classes = (IsAuthenticated,)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewDetailSerializer  # todo посмотреть как работает  u d
    permission_classes = (IsOwnerOrReadOnly,)


class CreateUserView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_user_model().objects.create_user(**serializer.validated_data)
        Basket.objects.create(user=user)
        return Response({"user": user.id}, status=status.HTTP_201_CREATED)


class BasketListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        add_product_in_basket(user=self.request.user, validated_data=serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return BasketProduct.objects.filter(basket=self.request.user.basket)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BasketSerializer
        return BasketDetailSerializer


class BasketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BasketProduct.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'PATCH':
            return BasketSerializer
        return BasketDetailSerializer


class RatingCreateView(generics.CreateAPIView):
    queryset = RatingUserProduct.objects.all()
    serializer_class = RatingCreateSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        add_rating(user=self.request.user, validated_data=serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)

# todo список категорий и брендов
