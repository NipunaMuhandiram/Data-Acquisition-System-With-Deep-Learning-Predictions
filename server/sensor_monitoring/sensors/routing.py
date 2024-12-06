# sensors/routing.py

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/sensors/$', consumers.SensorConsumer.as_asgi()),
]