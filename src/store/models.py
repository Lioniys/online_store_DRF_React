from django.db import models


class Products(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField
    img = models.ImageField(upload_to='img/%Y/%m/%d/', blank=True)
    categories = models.ForeignKey('Categories', on_delete=models.PROTECT)
    brands = models.ForeignKey('Brands', on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Categories(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name


class Brands(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self):
        return self.name
