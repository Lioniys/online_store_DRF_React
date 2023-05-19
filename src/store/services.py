from rest_framework import serializers
from . import models


def add_product_in_basket(*, user, validated_data):
    basket = user.basket
    product = validated_data.get('product')
    count = validated_data.get('count')
    queryset = models.BasketProduct.objects.filter(basket=basket, product=product)
    if queryset.exists():
        raise serializers.ValidationError('Product already in cart')
    models.BasketProduct.objects.create(basket=basket, product=product, count=count)


def _increment_counter_rating_product_star(*, product, star):
    """Increasing the rating score counter for a product"""
    obj, created = models.RatingProductStar.objects.get_or_create(product=product, star=star)
    obj.count += 1
    obj.save()


def _get_rating_product(*, queryset):
    """Getting the current product rating"""
    count_all = 0
    count_star = 0
    for obj in queryset:
        count_star += obj.count * obj.star
        count_all += obj.count
    return count_star/count_all


def _save_rating_product(*, product):
    """Maintaining the current product rating"""
    queryset = models.RatingProductStar.objects.filter(product=product)
    rating = _get_rating_product(queryset=queryset)
    product.rating = rating
    product.save()


def _check_user_is_add_rating(*, user, product):
    """Checking if the user has already rated"""
    queryset = models.RatingUserProduct.objects.filter(user=user, product=product)
    if queryset.exists():
        raise serializers.ValidationError('You already rated')


def add_rating(*, user, validated_data):
    product = validated_data.get('product')
    star = validated_data.get('star')
    _check_user_is_add_rating(user=user, product=product)
    models.RatingUserProduct.objects.create(user=user, product=product)
    _increment_counter_rating_product_star(product=product, star=star)
    _save_rating_product(product=product)


def _get_price_obj(*, obj):
    count = obj.count
    price = obj.product.price
    discounts = obj.product.discounts.all()
    discount_price = price - price * sum(discount.percentage_discount for discount in discounts)
    return count * discount_price


def calculate_additional_basket_data(*, queryset):
    count_all = 0
    total_sum = 0
    for obj in queryset:
        count_all += obj.count
        total_sum += _get_price_obj(obj=obj)
    return count_all, total_sum
