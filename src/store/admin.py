from django.contrib import admin
from .models import (
    Product,
    Category,
    Brand,
    RatingStar,
    RatingUserProduct,
    RatingProductStar,
    Basket,
    BasketProduct,
)


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(RatingStar)
admin.site.register(RatingProductStar)
admin.site.register(Basket)
admin.site.register(BasketProduct)
admin.site.register(RatingUserProduct)
