from rest_framework import serializers
from .models import (
    Product,
    Review,
    RatingUserProduct,
    Basket,
    BasketProduct,
    Photo,
    ProductInfo
)


class ProductsListSerializer(serializers.ModelSerializer):
    """Список товаров"""
    class Meta:
        model = Product
        exclude = ['category', 'brand']


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, instance):
        serializer = self.parent.parent.__class__(instance, context=self.context)
        return serializer.data


class FilterReviewSerializer(serializers.ListSerializer):
    """Вывод списка только родительских отзывов"""
    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class ReviewSerializer(serializers.ModelSerializer):
    """Для списка отзывов в товаре"""
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Meta:
        list_serializer_class = FilterReviewSerializer
        model = Review
        exclude = ['product']


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Создание отзыва"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = '__all__'


class ReviewDetailSerializer(serializers.ModelSerializer):
    """Отзыв"""
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Meta:
        model = Review
        fields = '__all__'


class ProductInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductInfo
        exclude = ['product']


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        exclude = ['product']


class ProductsDetailSerializer(serializers.ModelSerializer):
    """Товар"""
    category = serializers.CharField(read_only=True)
    brand = serializers.CharField(read_only=True)
    review = ReviewSerializer(many=True)
    photo = PhotoSerializer(many=True)
    product_info = ProductInfoSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class RatingCreateSerializer(serializers.ModelSerializer):
    """Добавление оценки рейтинга"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = RatingUserProduct
        fields = '__all__'


class ProductsBasketSerializer(serializers.ModelSerializer):
    """Товар для корзины"""

    class Meta:
        model = Product
        exclude = ['category', 'brand', 'rating', 'in_store']


class BasketListSerializer(serializers.ModelSerializer):
    """Список товаров в корзине пользователя"""
    product = ProductsBasketSerializer(read_only=True)

    class Meta:
        model = BasketProduct
        exclude = ['basket']


class BasketAddSerializer(serializers.ModelSerializer):
    """Добавление товара в корзину пользователя"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        user = validated_data.get('user')
        product = validated_data.get('product')
        count = validated_data.get('count')
        basket = Basket.objects.get(user=user)
        queryset = BasketProduct.objects.filter(basket=basket, product=product)
        if queryset.exists():
            raise serializers.ValidationError('Product already in cart')
        return BasketProduct.objects.create(basket=basket, product=product, count=count)

    class Meta:
        model = BasketProduct
        exclude = ['basket']


class BasketDetailSerializer(serializers.ModelSerializer):
    """Конкретный товар в корзине"""

    def update(self, instance, validated_data):
        instance.product = validated_data.get('product', instance.product)
        instance.count = validated_data.get('count', instance.count)
        instance.save()
        return instance

    class Meta:
        model = BasketProduct
        exclude = ['basket']
