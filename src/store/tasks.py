from celery import shared_task
from celery.utils.log import get_task_logger
from django.utils import timezone
from .models import DiscountProduct


@shared_task(name='check_discount')
def check_discount():
    logger = get_task_logger(__name__)
    logger.info("ok task run")
    queryset = DiscountProduct.objects.all()
    datetime_now = timezone.now()
    if queryset.exists():
        for obj in queryset:
            if obj.is_active:
                if datetime_now > obj.end_datetime:
                    obj.is_active = False
                    obj.save()
                    logger.info("deactivate")
            else:
                if obj.end_datetime > datetime_now > obj.start_datetime:
                    obj.is_active = True
                    obj.save()
                    logger.info("activate")
