:: Дропает базу данных, создает заново, выполняет makemigrations & migrate

set PGPASSWORD=123456qQ

c:\"Program Files"\PostgreSQL\9.6\bin\psql.exe -U postgres -c "drop database arsp3;"
c:\"Program Files"\PostgreSQL\9.6\bin\psql.exe -U postgres -c "create database arsp3;"

..\venv\Scripts\python.exe ..\manage.py migrate
::..\..\venv\Scripts\python.exe ..\create_only_users.py







