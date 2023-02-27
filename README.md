# DRF_online_store
http://ec2-3-124-171-195.eu-central-1.compute.amazonaws.com/api/v1/
<details><summary>🏗 Deploy :</summary>
Prod

```commandline
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml exec web python src/manage.py makemigrations --noinput
docker-compose -f docker-compose.prod.yml exec web python src/manage.py migrate --noinput
docker-compose -f docker-compose.prod.yml exec web python src/manage.py collectstatic --no-input --clear
docker-compose -f docker-compose.prod.yml exec web python src/manage.py createsuperuser --noinput
```

Dev

```commandline
docker-compose up -d --build
docker-compose exec web python src/manage.py makemigrations --noinput
docker-compose exec web python src/manage.py migrate --noinput
docker-compose exec web python src/manage.py flush --no-input
docker-compose exec web python src/manage.py createsuperuser --noinput
```

</details>

## Схема базы данных
![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/yreadme/online_store_db.png)
## swagger
![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/yreadme/swagger.png)