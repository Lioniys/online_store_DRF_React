from django.contrib import admin
from .models import (
    Product,
    Category,
    Brand,
    ProductInfo,
    RatingStar,
    RatingUserProduct,
    RatingProductStar,
    Basket,
)


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(ProductInfo)
admin.site.register(RatingStar)
admin.site.register(RatingProductStar)
admin.site.register(Basket)


admin.site.register(RatingUserProduct)
