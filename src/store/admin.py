from django.contrib import admin
from . import models


admin.site.register(models.Product)
admin.site.register(models.DiscountProduct)
admin.site.register(models.Category)
admin.site.register(models.Brand)
admin.site.register(models.RatingStar)
admin.site.register(models.RatingProductStar)
admin.site.register(models.Basket)
admin.site.register(models.BasketProduct)
admin.site.register(models.RatingUserProduct)
