from rest_framework import generics
from .models import GasSensor1, GasSensor2, LightSensor, VibrationSensor, HumidityPressureSensor, SoilMoistureSensor, pridictiondta
from .serializers import GasSensor1Serializer, GasSensor2Serializer, LightSensorSerializer, VibrationSensorSerializer, HumidityPressureSensorSerializer, SoilMoistureSensorSerializer, pridictiondtaSerializer


from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# sensors/views.py

from .models import GasSensor1
from .serializers import GasSensor1Serializer
from rest_framework import generics

# Example for GasSensor1View
class GasSensor1View(generics.CreateAPIView):
    queryset = GasSensor1.objects.all()
    serializer_class = GasSensor1Serializer

    def perform_create(self, serializer):
        instance = serializer.save()

        # Get the channel layer
        channel_layer = get_channel_layer()

        # Send data to the WebSocket group
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",  # Call send_sensor_data method in consumer
                "sensor_data": {
                    "sensor_id": "gas_sensor_1",
                    "gas_level": instance.gas_level,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )



class GasSensor2View(generics.CreateAPIView):
    queryset = GasSensor2.objects.all()
    serializer_class = GasSensor2Serializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "gas_sensor_2",
                    "gas_level": instance.gas_level,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )



class LightSensorView(generics.CreateAPIView):
    queryset = LightSensor.objects.all()
    serializer_class = LightSensorSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "light_sensor",
                    "light_intensity": instance.light_intensity,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )


class VibrationSensorView(generics.CreateAPIView):
    queryset = VibrationSensor.objects.all()
    serializer_class = VibrationSensorSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "vibration_sensor",
                    "vibration_level": instance.vibration_level,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )


class HumidityPressureSensorView(generics.CreateAPIView):
    queryset = HumidityPressureSensor.objects.all()
    serializer_class = HumidityPressureSensorSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "humidity_pressure_sensor",
                    "humidity": instance.humidity,
                    "pressure": instance.pressure,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )


class SoilMoistureSensorView(generics.CreateAPIView):
    queryset = SoilMoistureSensor.objects.all()
    serializer_class = SoilMoistureSensorSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "soil_moisture_sensor",
                    "moisture_level": instance.moisture_level,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )

class ForecastView(generics.CreateAPIView):
    queryset = pridictiondta.objects.all()
    serializer_class = pridictiondtaSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors_group",
            {
                "type": "send_sensor_data",
                "sensor_data": {
                    "sensor_id": "forecast",
                    "raw": instance.raw,
                    "pridict": instance.pridict,
                    "timestamp": instance.timestamp.isoformat(),
                },
            },
        )

