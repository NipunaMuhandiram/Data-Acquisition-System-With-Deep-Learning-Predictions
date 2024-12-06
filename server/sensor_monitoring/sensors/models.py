from django.db import models
from django.utils import timezone

class GasSensor1(models.Model):
    gas_level = models.FloatField()  # Gas concentration level
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Gas Sensor 1 - {self.gas_level}"

class GasSensor2(models.Model):
    gas_level = models.FloatField()  # Gas concentration level
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Gas Sensor 2 - {self.gas_level}"

class LightSensor(models.Model):
    light_intensity = models.FloatField()  # Light intensity value
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Light Sensor - {self.light_intensity}"

class VibrationSensor(models.Model):
    vibration_level = models.FloatField()  # Vibration level in specific units
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Vibration Sensor - {self.vibration_level}"

class HumidityPressureSensor(models.Model):
    humidity = models.FloatField()  # Humidity percentage
    pressure = models.FloatField()  # Atmospheric pressure in hPa
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Humidity & Pressure Sensor - {self.humidity}% / {self.pressure}hPa"

class SoilMoistureSensor(models.Model):
    moisture_level = models.FloatField()  # Soil moisture level
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Soil Moisture Sensor - {self.moisture_level}"
    
    

class pridictiondta(models.Model):
    raw = models.FloatField()  # Soil moisture level
    pridict = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"pridiction - {self.pridict}"
