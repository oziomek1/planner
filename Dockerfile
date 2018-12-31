FROM ubuntu:latest

LABEL maintainter="wozimek <ozimekwojciech@zoho.eu>"

COPY . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install -y python3 python3-pip python3-dev wget nodejs npm
RUN pip3 install -r requirements.txt \
    && pipenv --three \
    && pipenv install sqlalchemy psycopg2-binary
    && pipenv install flask marshmallow flask-cors
    && pipenv install python-jose-cryptodome
    && pipenv install alembic

RUN npm install -g @angular/cli
RUN npm install auth0-web@1.7.0
RUN npm install @angular/material @angular/cdk hammerjs
#CMD ["gunicorn", "-w 4", "main:app"]
CMD python ./starter.py