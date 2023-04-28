# DRF_online_store

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

![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/screenshots/online_store_db.png)
![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/yreadme/swagger.png)