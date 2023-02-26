# DRF_online_store

<details><summary>🏗 Deploy :</summary>

```
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml exec web python src/manage.py makemigrations --noinput
docker-compose -f docker-compose.prod.yml exec web python src/manage.py migrate --noinput
docker-compose -f docker-compose.prod.yml exec web python src/manage.py collectstatic --no-input --clear
docker-compose -f docker-compose.prod.yml exec web python src/manage.py createsuperuser --noinput
```


</details>

## Схема базы данных
![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/yreadme/online_store_db.png)
## swagger
![Image alt](https://github.com/Lioniys/DRF_online_store/raw/main/yreadme/swagger.png)