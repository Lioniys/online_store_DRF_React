from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, instance):
        serializer = self.parent.parent.__class__(instance, context=self.context)
        return serializer.data


class FilterReviewParentSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class ReviewListInProductSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Meta:
        list_serializer_class = FilterReviewParentSerializer
        model = models.Review
        exclude = ['product']


class ReviewCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Review
        fields = '__all__'


class ReviewDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True, read_only=True)

    class Meta:
        model = models.Review
        exclude = ['product']


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Photo
        exclude = ['product']


class DiscountListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DiscountProduct
        exclude = ['description', 'start_datetime', 'is_active', 'products']


class DiscountDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DiscountProduct
        exclude = ['start_datetime', 'is_active', 'products']


class ProductsListSerializer(serializers.ModelSerializer):
    discounts = DiscountListSerializer(read_only=True, many=True)

    class Meta:
        model = models.Product
        exclude = ['category', 'brand', 'in_store']


class ProductsDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    brand = serializers.CharField(read_only=True)
    review = ReviewListInProductSerializer(many=True)
    photos = PhotoSerializer(many=True)
    discounts = DiscountDetailSerializer(read_only=True, many=True)
    discount_price = serializers.SerializerMethodField()

    @staticmethod
    def get_discount_price(obj):
        price = obj.price
        _sum = sum(discount.percentage_discount for discount in obj.discounts.all())
        return price - price * _sum

    class Meta:
        model = models.Product
        fields = '__all__'


class ProductsInBasketSerializer(serializers.ModelSerializer):
    discounts = DiscountListSerializer(read_only=True, many=True)

    class Meta:
        model = models.Product
        exclude = ['category', 'brand', 'rating', 'in_store', 'description']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'email')


class BasketDetailSerializer(serializers.ModelSerializer):
    product = ProductsInBasketSerializer(read_only=True)

    class Meta:
        model = models.BasketProduct
        exclude = ['basket']


class BasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.BasketProduct
        exclude = ['basket']


class RatingCreateSerializer(serializers.ModelSerializer):
    star = serializers.ChoiceField([1, 2, 3, 4, 5])

    class Meta:
        model = models.RatingUserProduct
        exclude = ['user']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Brand
        fields = '__all__'
