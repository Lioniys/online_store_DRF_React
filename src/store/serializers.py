from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import (
    Product,
    Review,
    RatingUserProduct,
    BasketProduct,
    Photo,
)


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
        model = Review
        exclude = ['product']


class ReviewCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = '__all__'


class ReviewDetailSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    children = RecursiveSerializer(many=True)

    class Meta:
        model = Review
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        exclude = ['product']


class ProductsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ['category', 'brand']


class ProductsDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    brand = serializers.CharField(read_only=True)
    review = ReviewListInProductSerializer(many=True)
    photo = PhotoSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductsInBasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ['category', 'brand', 'rating', 'in_store', 'description']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')


class BasketDetailSerializer(serializers.ModelSerializer):
    product = ProductsInBasketSerializer(read_only=True)

    class Meta:
        model = BasketProduct
        exclude = ['basket']


class BasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = BasketProduct
        exclude = ['basket']


class RatingCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = RatingUserProduct
        exclude = ['user']
