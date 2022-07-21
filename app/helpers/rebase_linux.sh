#!/bin/bash
PGPASSWORD=123456qQ psql -U postgres -h localhost -c "drop database crudapp_db;"
PGPASSWORD=123456qQ psql -U postgres -h localhost -c "create database crudapp_db;"

../venv/bin/python ../manage.py makemigrations
../venv/bin/python ../manage.py migrate

