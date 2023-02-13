from django.db import models
from django.conf import settings


class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.PositiveIntegerField(default=0, null=True, blank=True)
    in_store = models.BooleanField(default=True)
    img = models.ImageField(upload_to='img/%Y/%m/%d/', blank=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    brand = models.ForeignKey('Brand', on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='review')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='children')
    time_create = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=5000)


class ProductInfo(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_info')

    def __str__(self):
        return self.title


class Rating(models.Model):
    product = models.ForeignKey(Product, related_name='rating', on_delete=models.CASCADE)
    one = models.PositiveIntegerField(default=0, null=True, blank=True)
    two = models.PositiveIntegerField(default=0, null=True, blank=True)
    three = models.PositiveIntegerField(default=0, null=True, blank=True)
    four = models.PositiveIntegerField(default=0, null=True, blank=True)
    five = models.PositiveIntegerField(default=0, null=True, blank=True)
    counter = models.PositiveIntegerField(default=0, null=True, blank=True)
    result = models.FloatField(default=0.0, null=True, blank=True)


class RatingUserProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    rate = models.PositiveIntegerField(default=0, null=True, blank=True)


class Basket(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    basket_product = models.ManyToManyField('Product')


class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name
