# # sensors/consumers.py

# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# class SensorConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.group_name = "sensors_group"
#         # await self.channel_layer.group_add(self.group_name, self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.group_name, self.channel_name)

#     async def receive(self, text_data):
#         data = json.loads(text_data)

#         # Here, you would handle incoming messages, if needed

#     async def send_sensor_data(self, event):
#         sensor_data = event['sensor_data']
#         await self.send(text_data=json.dumps(sensor_data))


# sensors/consumers.py

# sensors/consumers.py

# from channels.generic.websocket import AsyncWebsocketConsumer
# import json

# class SensorConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.group_name = "sensors_group"
        
#         # Join the group
#         await self.channel_layer.group_add(self.group_name, self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         # Leave the group
#         await self.channel_layer.group_discard(self.group_name, self.channel_name)

#     async def send_sensor_data(self, event):
#         # Extract the sensor data from the event
#         sensor_data = event['sensor_data']
        
#         # Send it to the WebSocket client
#         await self.send(text_data=json.dumps(sensor_data))





# from channels.db import database_sync_to_async

# from channels.generic.websocket import AsyncWebsocketConsumer
# import json
# from .models import (
#     GasSensor1,
#     GasSensor2,
#     LightSensor,
#     VibrationSensor,
#     HumidityPressureSensor,
#     SoilMoistureSensor,
# )

# class SensorConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.group_name = "sensors_group"
        
#         # Join the group
#         await self.channel_layer.group_add(self.group_name, self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         # Leave the group
#         await self.channel_layer.group_discard(self.group_name, self.channel_name)

#     async def send_sensor_data(self, event):
#         # Extract the sensor data from the event
#         sensor_data = event['sensor_data']
        
#         # Save sensor data to the database
#         await self.save_sensor_data(sensor_data)

#         # Send it to the WebSocket client
#         await self.send(text_data=json.dumps(sensor_data))

#     async def save_sensor_data(self, sensor_data):
#         # Determine the sensor type and save accordingly
#         sensor_id = sensor_data['sensor_id']
#         timestamp = sensor_data['timestamp']

#         if sensor_id == "gas_sensor_1":
#             gas_level = sensor_data['gas_level']
#             await database_sync_to_async(GasSensor1.objects.create)(gas_level=gas_level, timestamp=timestamp)
#         elif sensor_id == "gas_sensor_2":
#             gas_level = sensor_data['gas_level']
#             await database_sync_to_async(GasSensor2.objects.create)(gas_level=gas_level, timestamp=timestamp)
#         elif sensor_id == "light_sensor":
#             light_intensity = sensor_data['light_intensity']
#             await database_sync_to_async(LightSensor.objects.create)(light_intensity=light_intensity, timestamp=timestamp)
#         elif sensor_id == "vibration_sensor":
#             vibration_level = sensor_data['vibration_level']
#             await database_sync_to_async(VibrationSensor.objects.create)(vibration_level=vibration_level, timestamp=timestamp)
#         elif sensor_id == "humidity_pressure_sensor":
#             humidity = sensor_data['humidity']
#             pressure = sensor_data['pressure']
#             await database_sync_to_async(HumidityPressureSensor.objects.create)(humidity=humidity, pressure=pressure, timestamp=timestamp)
#         elif sensor_id == "soil_moisture_sensor":
#             moisture_level = sensor_data['moisture_level']
#             await database_sync_to_async(SoilMoistureSensor.objects.create)(moisture_level=moisture_level, timestamp=timestamp)





from channels.generic.websocket import AsyncWebsocketConsumer
import json

class SensorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "sensors_group"
        
        # Join the group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_sensor_data(self, event):
        # Extract the sensor data from the event
        sensor_data = event['sensor_data']
        
        # Broadcast the data to the WebSocket client
        await self.send(text_data=json.dumps(sensor_data))
