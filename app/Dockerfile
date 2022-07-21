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

# COPY ./docker-entrypoint.sh .
# RUN sed -i 's/\r$//g' /usr/src/app/docker-entrypoint.sh
# RUN chmod +x /usr/src/app/docker-entrypoint.sh

# copy project
COPY . .

# # run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]