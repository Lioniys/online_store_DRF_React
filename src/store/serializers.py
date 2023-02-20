from rest_framework import serializers
from .models import Product, Review, RatingUserProduct, Basket, BasketProduct


class ProductsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ['category', 'brand']


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, instance):
        serializer = self.parent.parent.__class__(instance, context=self.context)
        return serializer.data


class FilterReviewSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Meta:
        list_serializer_class = FilterReviewSerializer
        model = Review
        exclude = ['product']


class ReviewDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Mata:
        model = Review
        fields = '__all__'


class ProductsDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    brand = serializers.CharField(read_only=True)
    review = ReviewSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class ReviewCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = '__all__'


class RatingCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = RatingUserProduct
        fields = '__all__'


class ProductsBasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ['category', 'brand', 'rating', 'in_store']


class BasketListSerializer(serializers.ModelSerializer):
    product = ProductsBasketSerializer(read_only=True)

    class Meta:
        model = BasketProduct
        exclude = ['basket']


class BasketAddSerializer(serializers.ModelSerializer):
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

    def update(self, instance, validated_data):
        instance.product = validated_data.get('product', instance.product)
        instance.count = validated_data.get('count', instance.count)
        instance.save()
        return instance

    class Meta:
        model = BasketProduct
        exclude = ['basket']
