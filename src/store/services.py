
def get_rating_product(queryset):
    count_all = 0
    count_star = 0
    for obj in queryset:
        count_star += obj.count * obj.star.value
        count_all += obj.count
    return count_star/count_all
