from django.urls import path
from .views import ForecastView, GasSensor1View, GasSensor2View, LightSensorView, VibrationSensorView, HumidityPressureSensorView, SoilMoistureSensorView

urlpatterns = [
    path('gas1/', GasSensor1View.as_view(), name='gas_sensor_1'),
    path('gas2/', GasSensor2View.as_view(), name='gas_sensor_2'),
    path('light/', LightSensorView.as_view(), name='light_sensor'),
    path('vibration/', VibrationSensorView.as_view(), name='vibration_sensor'),
    path('humidity-pressure/', HumidityPressureSensorView.as_view(), name='humidity_pressure_sensor'),
    path('soil-moisture/', SoilMoistureSensorView.as_view(), name='soil_moisture_sensor'),
    path('forecast/', ForecastView.as_view(), name='ForecastView'),
    # path('prediction_data/', PredictionDataList.as_view(), name='prediction-data-list'),
]


# from django.urls import path

# from . import consumers
# from . import views
# from django.contrib.auth.views import LoginView, LogoutView


# urlpatterns = [
#     path('', views.index, name="index"),
#     path('login/', LoginView.as_view(template_name='sensors/login.html'), name='login'),
#     path('logout/', LogoutView.as_view(), name='logout'),
#     path("ws/presence", consumers.PresenceConsumer.as_asgi()),
# ]
