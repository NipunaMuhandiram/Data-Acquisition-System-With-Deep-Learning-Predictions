from rest_framework import serializers
from .models import GasSensor1, GasSensor2, LightSensor, VibrationSensor, HumidityPressureSensor, SoilMoistureSensor, pridictiondta

class GasSensor1Serializer(serializers.ModelSerializer):
    class Meta:
        model = GasSensor1
        fields = '__all__'

class GasSensor2Serializer(serializers.ModelSerializer):
    class Meta:
        model = GasSensor2
        fields = '__all__'

class LightSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LightSensor
        fields = '__all__'

class VibrationSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VibrationSensor
        fields = '__all__'

class HumidityPressureSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HumidityPressureSensor
        fields = '__all__'

class SoilMoistureSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilMoistureSensor
        fields = '__all__'


class pridictiondtaSerializer(serializers.ModelSerializer):
    class Meta:
        model = pridictiondta
        fields = '__all__'
        
from rest_framework import serializers
from .models import pridictiondta

class PredictionDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = pridictiondta
        fields = ['id', 'raw', 'pridict', 'timestamp']
