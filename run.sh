#!/bin/sh

cd src

python manage.py collectstatic --no-input --clear

python manage.py migrate

python manage.py createsuperuser --noinput

gunicorn online_store.wsgi:application --bind 0.0.0.0:8000