from rest_framework import serializers
from .models import Product, Review, RatingUserProduct, Basket


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


class BasketAddSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    basket_product = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Basket
        fields = '__all__'
