FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install boto3

COPY . .

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "travel_checker.wsgi:application", "--config", "gunicorn.conf.py"]