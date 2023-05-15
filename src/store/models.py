from django.db import models
from django.conf import settings


class Product(models.Model):
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=250)
    description = models.TextField(max_length=5000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_store = models.BooleanField(default=True)
    img = models.ImageField(upload_to='img/%Y/%m/%d/', null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    brand = models.ForeignKey('Brand', on_delete=models.PROTECT)
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']


class DiscountProduct(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=5000)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=False)
    percentage_discount = models.DecimalField(max_digits=2, decimal_places=1)
    products = models.ManyToManyField(Product, related_name="discounts")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='review')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='children')
    time_create = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=5000)

    def __str__(self):
        return f'user - {self.user} product - {self.product}'

    class Meta:
        ordering = ['id']


class RatingProductStar(models.Model):
    RATING_CHOICES = [(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    star = models.SmallIntegerField(choices=RATING_CHOICES)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'product - {self.product} star - {self.star} count - {self.count}'

    class Meta:
        ordering = ['id']


class RatingUserProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f'user - {self.user} product - {self.product}'

    class Meta:
        ordering = ['id']


class Basket(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="basket")

    def __str__(self):
        return f'user - {self.user}'

    class Meta:
        ordering = ['id']


class BasketProduct(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, related_name='basket_product')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'basket - {self.basket} product - {self.product} count - {self.count}'

    class Meta:
        ordering = ['id']


class Photo(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='photo')
    img = models.ImageField(upload_to='img/%Y/%m/%d/', null=True, blank=True)

    def __str__(self):
        return self.product

    class Meta:
        ordering = ['id']


class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']


class Brand(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
