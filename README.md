# DOCKER CRUD APP
Практическое применение методов контейнеризации web-приложений защищенной операционной системе Astra Linux


# Цели работы
В ходе практики были поставлены следующие цели:
* Изучение Docker и Docker-compose: Были изучены основы работы с Docker и Docker-compose, позволяющие создавать изолированные контейнеры для приложений.
* Разработка web-приложения: Главной задачей было разработать web-приложение на базе Django + Django Rest Framework с использованием базы данных PostgreSQL и упаковать его в контейнер Docker. Приложение должно было быть развернуто на операционной системе Astra Linux "Орел" и обеспечивать возможность переноса и развертывания на нескольких локальных ПЭВМ.

# Функциональная часть web-приложения
Web-приложение, разработанное в ходе практики, включает в себя следующие функциональные возможности:
* Пользовательский интерфейс: Пользовательский интерфейс приложения отображает необходимую информацию из таблиц базы данных.
* Изменение данных: Пользователи имеют возможность вносить необходимые изменения в базу данных через интерфейс приложения, включая добавление, удаление и изменение записей.
* Использование js, html, css: Пользовательский интерфейс реализован с использованием языков программирования и технологий веб-разработки, таких как JavaScript, HTML и CSS. В качестве средства JavaScript для реализации интерактивных элементов был выбран фреймворк ExtJS.

# Ход работы
## Разработка приложения CRUD APP

Было реализовано приложение для учёта личного состава. Приложение включает в себя четыре таблицы:
* Сотрудники;
* Отделы; 
* Должности; 
* Кабинеты.
  
### Разработка функциональной части приложения.
Для данного приложения была разработана API-маршрутизация при помощи Django и Django-Rest-API. 
Для этого были подготовлены:
* Модели (Models.py):
  * Department; 
  * Post; 
  * Cabinet; 
  * Employee.
* Сериализаторы (Serializers.py):
  * DeartmentSerializer; 
  * PostSerializer; 
  * CabinetSerializer; 
  * EmployeeSerializer.
* Представления (Views.py):
  * DepartmentViewSet; 
  * PostViewSet; 
  * CabinetViewSet; 
  * EmployeeViewSet.
      
При получении соответствующего запроса (Request) от WEB-клиента, сервер Django обрабатывает его, выполняет необходимый функционал 
и возвращает ответ (Response).

### Разработка пользовательского интерфейса.

Пользовательский интерфейс приложения состоит из одностраничного сайта, в котором находятся вкладки, для переключения между таблицами:

* Таблица отделов позволяет пользователю взаимодействовать с записями отделов (добавлять, удалять, изменять).
![table_department.png](devdoc%2Fimg%2Ftable_department.png)

* Таблица должностей позволяет пользователю взаимодействовать с записями должностей (добавлять, удалять, изменять).
![table_post.png](devdoc%2Fimg%2Ftable_post.png)

* Таблица кабинетов позволяет пользователю взаимодействовать с записями кабинетов (добавлять, удалять, изменять).
![table_cabinet.png](devdoc%2Fimg%2Ftable_cabinet.png)

* Таблица сотрудников. Является основной таблицей приложения. Позволяет вести учёт военнослужащих на предприятии. Связана с остальными таблицами при помощи связи many-to-one.
![table_employee.png](devdoc%2Fimg%2Ftable_employee.png)

Каждая таблица формируется на основе данных, полученных при помощи HTTP-запросов, представленных соответствующей API-ссылкой:
*	Для получения данных используется GET-запрос;
*	Для создания записей в базе данных используется POST-запрос;
*	Для редактирования записей в базе данных используется PUT-запрос;
*	Для удаления записей в базе данных используется DELETE-запрос.

Для каждой таблицы реализованы кнопки для взаимодействия с записями:
* Создание записи. Соответствующая таблице форма открывается при нажатии на кнопку «Добавить». Пользователь вносит данные в поля и отправляет POST-запрос на создание записи.
![create_before.png](devdoc%2Fimg%2Fcreate_before.png)
* Удаление записи. При нажатии на кнопку «Удалить» открывается предупреждающее окно. Пользователь должен подтвердить намерения, после чего будет отправлен DELETE-запрос на удаление записи.
![delete_before.png](devdoc%2Fimg%2Fdelete_before.png)
* Изменение записи. Пользователю необходимо внести изменения в соответствующие поля, после чего нажать на кнопку «Update». Будет отправлен PUT-запрос на изменение записи.
![update_before.png](devdoc%2Fimg%2Fupdate_before.png)

### Создание образа и контейнеров разработанного приложения при помощи Docker и Docker-compose.
Для настройки образов и контейнеров в Docker используется два файла: 
*	Dockerfile – содержит список инструкций для образа;
*	docker-compose.yml – позволяет запустить несколько контейнеров и связать их.
  
Для работы приложения необходимо одновременно запускать два контейнера: для сервера Django и для PostgreSQL.

Контейнер PostgreSQL можно запустить на основе уже готового образа postgres:13.0-alpine, который был скачен заранее.

#### Dockerfile
Для самого приложения необходимо вручную описать образ. Это будет сделано в файле Dockerfile

```Dockerfile
# образ на основе которого создаём контейнер
FROM python:3.10

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install gcc -y && \
    apt-get install libpq-dev python3-dev -y

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .
```

Переменная окружения 'PYTHONDONTWRITEBYTECODE' сообщает Python не создавать файлы кэша .pyc;

Переменная окружения 'PYTHONUNBUFFERED' не позволит Python помещать в буфер потоки stdout и stderr.

Переменная окружения 'PYTHONUNBUFFERED' не позволит Python помещать в буфер потоки stdout и stderr.

#### requirements.txt
Все необходимые библиотеки находятся в файле requirements.txt

```
Django==2.2
django-crum==0.7.6
django-filter==2.2.0
djangorestframework==3.11.0
psycopg2-binary==2.9.3
pytz==2022.1
sqlparse==0.4.2
```

Таким образом, описанный образ будет запускать процесс установки python 3.10 и всех необходимых зависимостей, создавать рабочую директорию, в которую будут скопированы файлы приложения, после чего проект будет готов к запуску. 

#### docker-compose.yml
Настройки файла docker-compose.yml для запуска двух контейнеров: базы данных PostgreSQL и созданного вручную контейнера приложения.

```yml
version: '3.8'

services:
  web:
    build: ./app
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./app/:/usr/src/app/
    ports:
      - 8000:8000
    env_file:
      - ./.env.dev
    depends_on:
      - db
  db:
    image: postgres:13.0-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123456qQ
      - POSTGRES_DB=crudapp_db

volumes:
  postgres_data:
```

### Развертывание приложения на операционной системе военного назначения Astra Linux «Орел».
Перед развертыванием приложения на операционной системе Astra Linux, необходимо выполнить ряд подготовительных шагов, включая установку Docker и Docker-compose.

#### Установка Docker

Установка Docker выполняется при помощи команд:
```bash
sudo apt update
sudo apt install docker.io
```

#### Установка Docker-compose
Установка docker-compose выполняется при помощи команд:
```bash
sudo apt -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Сборка образа и запуск контейнеров
После успешной установки Docker и Docker-compose, необходимо собрать образ приложения и запустить контейнеры:
```bash 
sudo docker-compose up -d –build
```

#### Выполнение миграций базы данных
Как только контейнеры будут запущены, следует выполнить миграции базы данных для нашего приложения:
```bash 
sudo docker-compose exec web python manage.py migrate
```

#### Завершение развертывания
После выполнения всех вышеперечисленных шагов, приложение готово к использованию на операционной системе Astra Linux.

Успешный запуск приложения на операционной системе военного назначения Astra Linux «Орел».
![result.jpg](devdoc%2Fimg%2Fresult.jpg)