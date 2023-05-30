from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
# from django.utils.decorators import method_decorator
# from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from . import permissions, serializers, services, models, pagination


class ProductsListView(generics.ListCreateAPIView):
    queryset = models.Product.objects.filter(in_store=True)
    serializer_class = serializers.ProductsListSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['category', 'brand', 'discounts']
    search_fields = ['name']
    ordering_fields = ['price']

    # @method_decorator(cache_page(60 * 15))
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            services.calculate_additional_product_list_data(serializer=serializer)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        services.calculate_additional_product_list_data(serializer=serializer)
        return Response(serializer.data)


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.filter(in_store=True)
    serializer_class = serializers.ProductsDetailSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)


class ReviewCreateView(generics.CreateAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewCreateSerializer
    permission_classes = (IsAuthenticated,)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewDetailSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)


class CreateUserView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = services.create_user(validated_data=serializer.validated_data)
        return Response(data, status=status.HTTP_201_CREATED)


class BasketListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = None

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.add_product_in_basket(user=self.request.user, validated_data=serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        count_all, total_sum = services.calculate_additional_basket_data(queryset=queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response({"count_all": count_all, "total_sum": total_sum, "list_product": serializer.data})

    def get_queryset(self):
        return models.BasketProduct.objects.filter(basket=self.request.user.basket)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.BasketSerializer
        return serializers.BasketDetailSerializer


class BasketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.BasketProduct.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'PATCH':
            return serializers.BasketSerializer
        return serializers.BasketDetailSerializer


class RatingCreateView(generics.CreateAPIView):
    queryset = models.RatingUserProduct.objects.all()
    serializer_class = serializers.RatingCreateSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.add_rating(user=self.request.user, validated_data=serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)


class CategoryListView(generics.ListCreateAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)
    pagination_class = pagination.CustomPagination


class BrandListView(generics.ListCreateAPIView):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)
    pagination_class = pagination.CustomPagination


class DiscountListView(generics.ListAPIView):
    queryset = models.DiscountProduct.objects.filter(is_active=True)
    serializer_class = serializers.DiscountDetailSerializer


@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated])
def verify_view(request):
    return Response(status=200)
