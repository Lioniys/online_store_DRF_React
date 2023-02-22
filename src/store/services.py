from .models import RatingProductStar, Product


def get_rating_product(queryset):
    """Получение актуального рейтинга товара"""
    count_all = 0
    count_star = 0
    for obj in queryset:
        count_star += obj.count * obj.star.value
        count_all += obj.count
    return count_star/count_all


def increment_counter_rating_product_star(product, star):
    """Увеличение счетчика оценки рейтинга для товара"""
    obj, created = RatingProductStar.objects.update_or_create(product=product, star=star)
    obj.count += 1
    obj.save()


def save_rating_product(product):
    """Сохранение актуального рейтинга товара"""
    queryset = RatingProductStar.objects.filter(product=product)
    rating = get_rating_product(queryset)
    obj = Product.objects.get(pk=product.pk)
    obj.rating = rating
    obj.save()
