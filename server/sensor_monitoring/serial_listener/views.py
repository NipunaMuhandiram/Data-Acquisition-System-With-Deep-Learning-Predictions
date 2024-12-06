import serial
import threading
from django.http import JsonResponse

# Global variable to store data
# received_data = []

# def listen_serial(port, baud_rate):
#     global received_data
#     ser = serial.Serial(port, baudrate=baud_rate, timeout=1)
    
#     while True:
#         data = ser.readline()  # Read data
#         if data:
#             received_data.append(data.decode().strip())




import queue
import datetime
import serial
import time
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Global variable to store data
received_data = []
BATCH_DURATION = 1  # Batch duration in seconds
command_queue = queue.Queue()


import serial
import time
import datetime
import threading
from queue import Queue
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sensors.models import pridictiondta
from sensors.serializers import PredictionDataSerializer


# Constants
BATCH_DURATION = 0.1  # Batch duration in seconds
received_data = []
command_queue = Queue()

def listen_serial(port, baud_rate):
    global received_data
    ser = serial.Serial(port, baudrate=baud_rate, timeout=1)
    
    # Start a separate thread to handle command sending
    def send_commands():
        while True:
            try:
                # Get command from queue, block if empty
                command = command_queue.get(block=True)
                
                # Send command over serial
                ser.write((command + '\n').encode())
                
                # Mark task as done
                command_queue.task_done()
            except Exception as e:
                print(f"Command sending error: {e}")

    # Start command sender thread
    command_sender_thread = threading.Thread(target=send_commands, daemon=True)
    command_sender_thread.start()

    while True:
        batch_start_time = time.time()  # Start the batch timer
        sensor_data_batch = []  # Initialize a batch for collecting sensor data

        while time.time() - batch_start_time < BATCH_DURATION:
            data = ser.readline()  # Read data from the serial port
            if data:
                try:
                    decoded_data = data.decode().strip()
                    received_data.append(decoded_data)
                    
                    prediction_data = pridictiondta.objects.all().order_by('-timestamp')[:1]
                    serializer = PredictionDataSerializer(prediction_data, many=True)
                    # Split the decoded data into sensor values
                    values = list(map(float, decoded_data.split(",")))

                    # Map the values to corresponding sensors
                    sensor_data = {
                        "acceleration_x": values[0],
                        "acceleration_y": values[1],
                        "acceleration_z": values[2],
                        "gyro_x": values[3],
                        "gyro_y": values[4],
                        "gyro_z": values[5],
                        "temperature": values[6],
                        "pressure": values[7],
                        "altitude": values[8],
                        "light_intensity": values[9],
                        "vibration_level": values[10],
                        "pridicts": serializer.data,
                    }

                    sensor_data_batch.append(sensor_data)  # Collect sensor data into the batch
                except Exception as e:
                    print(f"Data parsing error: {e}")

        # Generate a single timestamp for all readings
        timestamp = datetime.datetime.now().isoformat()
        channel_layer = get_channel_layer()

        # Prepare and send messages
        for sensor_data in sensor_data_batch:
            # Prepare a message with a common timestamp
            sensor_data["timestamp"] = timestamp

            # Send the data to the WebSocket group
            async_to_sync(channel_layer.group_send)(
                "sensors_group",
                {
                    "type": "send_sensor_data",
                    "sensor_data": sensor_data,
                },
            )
            # print(sensor_data)


# def listen_serial(port, baud_rate):
#     global received_data
#     ser = serial.Serial(port, baudrate=baud_rate, timeout=1)
    
#     # Start a separate thread to handle command sending
#     def send_commands():
#         while True:
#             try:
#                 # Get command from queue, block if empty
#                 command = command_queue.get(block=True)
                
#                 # Send command over serial
#                 ser.write((command + '\n').encode())
                
#                 # Mark task as done
#                 command_queue.task_done()
#             except Exception as e:
#                 print(f"Command sending error: {e}")

#     # Start command sender thread
#     command_sender_thread = threading.Thread(target=send_commands, daemon=True)
#     command_sender_thread.start()

#     while True:
#         batch_start_time = time.time()  # Start the batch timer
#         sensor_data_batch = []  # Initialize a batch for collecting sensor data

#         while time.time() - batch_start_time < BATCH_DURATION:
#             data = ser.readline()  # Read data from the serial port
#             if data:
#                 decoded_data = data.decode().strip()
#                 received_data.append(decoded_data)
                
#                 # Split the decoded data into separate sensor readings
#                 sensor_lines = decoded_data.split(",")  # Assuming readings are comma-separated
#                 sensor_data = {}

#                 for line in sensor_lines:
#                     if line:
#                         # Split each sensor line into key and value
#                         sensor, value = line.split(":")
#                         sensor_data[sensor.strip()] = value.strip()

#                 sensor_data_batch.append(sensor_data)  # Collect sensor data into the batch

#         # Generate a single timestamp for all readings
#         timestamp = datetime.datetime.now().isoformat()
#         channel_layer = get_channel_layer()

#         # Prepare a message to send for all sensors with the same timestamp
#         for sensor_data in sensor_data_batch:
#             messages = []

#             # Prepare messages for each sensor
#             if 'gas_sensor_1' in sensor_data:
#                 messages.append({
#                     "sensor_id": "gas_sensor_1",
#                     "gas_level": sensor_data['gas_sensor_1'],
#                 })

#             elif 'Temperature' in sensor_data:
#                 messages.append({
#                     "sensor_id": "gas_sensor_2",
#                     "gas_level": sensor_data['Temperature'].replace(" C", ""),
#                 })

#             if 'humidity_pressure_sensor' in sensor_data:
#                 humidity_pressure = sensor_data['humidity_pressure_sensor']
#                 messages.append({
#                     "sensor_id": "humidity_pressure_sensor",
#                     "humidity": humidity_pressure,
#                     "pressure": humidity_pressure,
#                 })

#             elif 'light_sensor' in sensor_data:
#                 messages.append({
#                     "sensor_id": "light_sensor",
#                     "light_intensity": sensor_data['light_sensor'],
#                 })

#             if 'vibration_sensor' in sensor_data:
#                 messages.append({
#                     "sensor_id": "vibration_sensor",
#                     "vibration_level": sensor_data['vibration_sensor'],
#                 })

#             # Send all messages in a single WebSocket call
#             for message in messages:
#                 print(messages)
#                 print("")
#                 message["timestamp"] = timestamp  # Add the common timestamp
#                 async_to_sync(channel_layer.group_send)(
#                     "sensors_group",
#                     {
#                         "type": "send_sensor_data",
#                         "sensor_data": message,
#                     },
#                 )
        
 # Add a global variable to track the current port
current_selected_port = None

def start_serial_listener(request):
    global current_selected_port
    port = request.GET.get('port')  # Get the port from the request
    baud_rate = 9600  # Set baud rate

    # Store the current port
    current_selected_port = port

    # Start a thread to listen to the serial port
    threading.Thread(target=listen_serial, args=(port, baud_rate), daemon=True).start()

    return JsonResponse({
        'message': 'Listening on port {}'.format(port),
        'current_port': port
    })

def get_current_port(request):
    """
    API endpoint to retrieve the currently selected serial port
    """
    if current_selected_port:
        return JsonResponse({
            'current_port': current_selected_port,
            'status': 'active'
        })
    else:
        return JsonResponse({
            'current_port': None,
            'status': 'no port selected'
        }, status=404)       



# def start_serial_listener(request):
#     port = request.GET.get('port')  # Get the port from the request
#     baud_rate = 9600  # Set baud rate

#     # Start a thread to listen to the serial port
#     threading.Thread(target=listen_serial, args=(port, baud_rate), daemon=True).start()

#     return JsonResponse({'message': 'Listening on port {}'.format(port)})

def get_received_data(request):
    return JsonResponse({'data': received_data})


import serial.tools.list_ports
from django.http import JsonResponse

def list_com_ports(request):
    ports = serial.tools.list_ports.comports()
    available_ports = [port.device for port in ports]
    return JsonResponse({'available_ports': available_ports})



def queue_serial_command(command):
    """
    Add a command to the serial command queue
    """
    command_queue.put(command)
    return {
        'message': f'Command "{command}" queued',
        'queue_size': command_queue.qsize()
    }

def send_serial_command(request):
    """
    Django view to handle serial command requests
    http://localhost:8000/serial/send_command_to_serial/?command=ACTIVATE_PD4
    http://localhost:8000/serial/send_command_to_serial/?command=DEACTIVATE_PD4
    """
    if request.method == 'GET':
        # command = request.POST.get('command')
        command = request.GET.get('command')
        if not command:
            return JsonResponse({'error': 'No command provided'}, status=400)
        
        result = queue_serial_command(command)
        return JsonResponse(result)
    
    
# THRESHOLDS = {
#     "gas_sensor_1": 800,  # Gas sensor 1 threshold
#     "gas_sensor_2": 800,  # Gas sensor 2 threshold (temperature)
#     "light_sensor": 800,  # Light intensity threshold
#     "vibration_sensor": 500,  # Vibration level threshold
#     "humidity_pressure_sensor": 60,  # Humidity threshold
# }

THRESHOLDS = {
    "acceleration_x": 1000,  # Acceleration X threshold (you can adjust this value)
    "acceleration_y": 1000,  # Acceleration Y threshold (you can adjust this value)
    "acceleration_z": 1000,  # Acceleration Z threshold (you can adjust this value)
    "gyro_x": 500,  # Gyroscope X threshold (you can adjust this value)
    "gyro_y": 500,  # Gyroscope Y threshold (you can adjust this value)
    "gyro_z": 500,  # Gyroscope Z threshold (you can adjust this value)
    "temperature": 30,  # Temperature threshold (you can adjust this value)
    "pressure": 1013,  # Pressure threshold (you can adjust this value)
    "altitude": 1000,  # Altitude threshold (you can adjust this value)
    "light_intensity": 800,  # Light intensity threshold (unchanged)
    "vibration_level": 500,  # Vibration level threshold (unchanged)
}


from django.http import JsonResponse

def get_thresholds(request):
    """
    API to get the current thresholds for sensors
    """
    return JsonResponse({"thresholds": THRESHOLDS})


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def set_thresholds(request):
    """
    API to set thresholds for sensors
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON body

            # Validate the input
            invalid_keys = [key for key in data.keys() if key not in THRESHOLDS]
            if invalid_keys:
                return JsonResponse(
                    {"error": f"Invalid sensors: {', '.join(invalid_keys)}"},
                    status=400
                )

            # Update thresholds
            for key, value in data.items():
                if isinstance(value, (int, float)) and value >= 0:
                    THRESHOLDS[key] = value
                else:
                    return JsonResponse(
                        {"error": f"Invalid value for {key}: {value}. Must be a non-negative number."},
                        status=400
                    )

            return JsonResponse({"message": "Thresholds updated successfully", "thresholds": THRESHOLDS})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON body"}, status=400)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)
