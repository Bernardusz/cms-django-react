FROM python:3.12-slim AS base

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . ./

ENV PORT=8000

CMD ["./wait-for-postgres.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000"]
