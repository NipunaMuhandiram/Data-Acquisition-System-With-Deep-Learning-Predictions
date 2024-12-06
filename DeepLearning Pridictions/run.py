

# import os
# import json
# import time
# import math
import matplotlib.pyplot as plt
# import serial
# import numpy as np

from core.data_processor import DataLoader
from core.model import Model

fig = plt.figure(facecolor='white')

def plot_results(predicted_data, true_data):
    plt.cla() #clear previous fig
    ax = fig.add_subplot(111)
    ax.plot(true_data, label='True Data')
    plt.plot(predicted_data, label='Prediction')
    plt.legend()



def plot_results_multiple(predicted_data, true_data, prediction_len):
    fig = plt.figure(facecolor='white')
    ax = fig.add_subplot(111)
    ax.plot(true_data, label='True Data')
	# Pad the list of predictions to shift it in the graph to it's correct start
    for i, data in enumerate(predicted_data):
        padding = [None for p in range(i * prediction_len)]
        plt.plot(padding + data, label='Prediction')
        plt.legend()
    plt.show()


# def main():
    
#     configs = json.load(open('config.json', 'r'))
#     if not os.path.exists(configs['model']['save_dir']): os.makedirs(configs['model']['save_dir'])

#     model = Model()
#     model.build_model(configs)

#     #get live sensor data from Arduino and predict next 10 sensor data
#     sensor_port = serial.Serial('COM7', 9600)
#     sensor_port.close()
#     sensor_port.open()
#     seq_len=configs['data']['sequence_length'],
#     sensor_data= []
#     predictions_data = []
#     live_data = np.arange(seq_len[0]-1) 
    
#     plt.ion() #real time graph

#     while True:
#         i=0
#         while i < seq_len[0]-1:              # store incoming data to testing data array
#             b = sensor_port.readline()         # read a byte string
#             # live_data[i]= float(b.decode(errors='ignore'))
#             live_data[i] = float(''.join(filter(str.isdigit, b.decode(errors='ignore').replace('.', ''))) or 0)
#             sensor_data.append(live_data[i])
#             i+=1    
#         sensor_struct_data = live_data[np.newaxis,:,np.newaxis] #contruct live data for LSTM
#         predictions= model.predict_sequence_live(sensor_struct_data, configs['data']['sequence_length']) #Shift the window by 1 new prediction each time, re-run predictions on new window
#         predictions_data.append(predictions)

#         plot_results(predictions_data[-120:],sensor_data[-100:])
#         plt.show()
#         plt.pause(0.1) #critical to display continous img

#         #predict every 10 seq_len
#         #if len(sensor_data) > 1 * seq_len[0]:

#         #train every 100 seq_len
#         if len(sensor_data) >10 * seq_len[0]:
#             np.savetxt('data\sensor.csv', sensor_data, delimiter = ',', header='sensor_value')

#         #load data for training
#             data = DataLoader(
#             os.path.join('data', configs['data']['filename']),
#             configs['data']['train_test_split'],
#             configs['data']['columns']
#             )

#             x, y = data.get_train_data(
#                 seq_len=configs['data']['sequence_length'],
#                 normalise=configs['data']['normalise']
#                 )
#         # in-memory training
#             model.train(
#                 x,
#                 y,
#                 epochs = configs['training']['epochs'],
#                 batch_size = configs['training']['batch_size'],
#                 save_dir = configs['model']['save_dir']
#             )
#             sensor_data =sensor_data[-100:]


# if __name__ == '__main__':
#     main()




''' code warehouse
    # out-of memory generative training
    steps_per_epoch = math.ceil((data.len_train - configs['data']['sequence_length']) / configs['training']['batch_size'])
    model.train_generator(
        data_gen=data.generate_train_batch(
            seq_len=configs['data']['sequence_length'],
            batch_size=configs['training']['batch_size'],
            normalise=configs['data']['normalise']
        ),
        epochs=configs['training']['epochs'],
        batch_size=configs['training']['batch_size'],
        steps_per_epoch=steps_per_epoch,
        save_dir=configs['model']['save_dir']
    )


        x_test, y_test = data.get_test_data(
        seq_len=configs['data']['sequence_length'],
        normalise=configs['data']['normalise']
        )
    
    '''

        #other prediction mode
    #predictions = model.predict_point_by_point(x_test)
    #predictions = model.predict_sequence_full(sensor_data, configs['data']['sequence_length']) #Shift the window by 1 new prediction each time, re-run predictions on new window
    #predictions2 = model.predict_sequences_multiple(x_test, configs['data']['sequence_length'], configs['data']['sequence_length'])
    #plot_results_multiple(predictions2, y_test, configs['data']['sequence_length'])
  
  
  
# import asyncio
# import websockets
# import json
# import numpy as np
# import os
# import matplotlib.pyplot as plt


# async def fetch_sensor_data(uri, model, configs):
#     seq_len = configs['data']['sequence_length']
#     sensor_data = []
#     predictions_data = []
#     live_data = np.zeros(seq_len)  # Initialize with zeros
    
#     plt.ion()  # Enable real-time graph

#     async with websockets.connect(uri) as websocket:
#         while True:
#             i = 0
#             while i < seq_len - 1:  # Collect enough data for the sequence
#                 try:
#                     message = await websocket.recv()  # Receive WebSocket message
#                     data = json.loads(message)       # Assume WebSocket sends JSON
                    
#                     # Check if the message is from "gas_sensor_2"
#                     if data.get("sensor_id") == "gas_sensor_2":
#                         value = float(data.get("gas_level", 0))  # Extract `gas_level` value
#                         live_data[i] = value
#                         sensor_data.append(value)
#                         i += 1  # Increment only when valid data is added
                    
#                     # value = float(data.get("value", 0))  # Extract the sensor value
#                     # live_data[i] = value
#                     # sensor_data.append(value)
#                     # i += 1
#                 except (ValueError, KeyError) as e:
#                     print(f"Error processing WebSocket message: {e}")
#                     continue

#             sensor_struct_data = live_data[np.newaxis, :, np.newaxis]  # Prepare for LSTM
#             predictions = model.predict_sequence_live(sensor_struct_data, seq_len)
#             predictions_data.append(predictions)

#             # Plot the results
#             plot_results(predictions_data[-120:], sensor_data[-100:])
#             plt.show()
#             plt.pause(0.1)  # Ensure continuous graph updates

#             # Train every 10 sequences
#             if len(sensor_data) > 10 * seq_len:
#                 np.savetxt('data/sensor.csv', sensor_data, delimiter=',', header='sensor_value')

#                 # Load data for training
#                 data = DataLoader(
#                     os.path.join('data', configs['data']['filename']),
#                     configs['data']['train_test_split'],
#                     configs['data']['columns']
#                 )
#                 x, y = data.get_train_data(
#                     seq_len=configs['data']['sequence_length'],
#                     normalise=configs['data']['normalise']
#                 )

#                 # Train the model
#                 model.train(
#                     x,
#                     y,
#                     epochs=configs['training']['epochs'],
#                     batch_size=configs['training']['batch_size'],
#                     save_dir=configs['model']['save_dir']
#                 )
#                 sensor_data = sensor_data[-100:]  # Keep recent data

# def main():
#     configs = json.load(open('config.json', 'r'))
#     if not os.path.exists(configs['model']['save_dir']):
#         os.makedirs(configs['model']['save_dir'])

#     model = Model()
#     model.build_model(configs)

#     uri = "ws://localhost:8000/ws/sensors/"  # WebSocket URI

#     # Start the asyncio event loop
#     asyncio.run(fetch_sensor_data(uri, model, configs))

# if __name__ == '__main__':
#     main()














import asyncio
import websockets
import json
import numpy as np
import os
import matplotlib.pyplot as plt
import requests  # To send HTTP requests

# async def fetch_sensor_data(uri, model, configs):
#     seq_len = configs['data']['sequence_length']
#     sensor_data = []
#     predictions_data = []
#     live_data = np.zeros(seq_len)  # Initialize with zeros
    
#     # Initialize real-time graph (not needed anymore if you are not plotting)
#     plt.ion()  

#     async with websockets.connect(uri) as websocket:
#         while True:
#             i = 0
#             while i < seq_len - 1:  # Collect enough data for the sequence
#                 try:
#                     message = await websocket.recv()  # Receive WebSocket message
#                     data = json.loads(message)       # Assume WebSocket sends JSON
                    
#                     # Check if the message is from "gas_sensor_2"
#                     if data.get("sensor_id") == "gas_sensor_2":
#                         value = float(data.get("gas_level", 0))  # Extract `gas_level` value
#                         live_data[i] = value
#                         sensor_data.append(value)
#                         i += 1  # Increment only when valid data is added
                    
#                 except (ValueError, KeyError) as e:
#                     print(f"Error processing WebSocket message: {e}")
#                     continue

#             # Prepare data for prediction
#             sensor_struct_data = live_data[np.newaxis, :, np.newaxis]  # Prepare for LSTM
#             predictions = model.predict_sequence_live(sensor_struct_data, seq_len)
#             predictions_data.append(predictions)

#             # Send predictions to the API instead of plotting
#             if predictions_data:
#                 # Extract raw and predicted values (assuming predictions are in a format that can be extracted this way)
#                 raw_value = float(sensor_data[-1])  # Convert to Python float
#                 predicted_value = float(predictions[-1])  # Convert to Python float

#                 # Round to 2 decimal places
#                 raw_value = round(raw_value, 2)
#                 predicted_value = round(predicted_value, 2)

#                 # Prepare data for API
#                 payload = {
#                     "raw": raw_value,
#                     "pridict": predicted_value
#                 }

#                 # Send data to the API
#                 try:
#                     response = requests.post("http://localhost:8000/forecast/", json=payload)
#                     if response.status_code == 200:
#                         print(f"Data successfully sent to API: {payload}")
#                     else:
#                         print(f"Failed to send data. Status code: {response.status_code}")
#                 except Exception as e:
#                     print(f"Error sending data to API: {e}")

#             # Train every 10 sequences
#             if len(sensor_data) > 10 * seq_len:
#                 np.savetxt('data/sensor.csv', sensor_data, delimiter=',', header='sensor_value')

#                 # Load data for training
#                 data = DataLoader(
#                     os.path.join('data', configs['data']['filename']),
#                     configs['data']['train_test_split'],
#                     configs['data']['columns']
#                 )
#                 x, y = data.get_train_data(
#                     seq_len=configs['data']['sequence_length'],
#                     normalise=configs['data']['normalise']
#                 )

#                 # Train the model
#                 model.train(
#                     x,
#                     y,
#                     epochs=configs['training']['epochs'],
#                     batch_size=configs['training']['batch_size'],
#                     save_dir=configs['model']['save_dir']
#                 )
#                 sensor_data = sensor_data[-100:]  # Keep recent data

# def main():
#     configs = json.load(open('config.json', 'r'))
#     if not os.path.exists(configs['model']['save_dir']):
#         os.makedirs(configs['model']['save_dir'])

#     model = Model()
#     model.build_model(configs)

#     uri = "ws://localhost:8000/ws/sensors/"  # WebSocket URI

#     # Start the asyncio event loop
#     asyncio.run(fetch_sensor_data(uri, model, configs))

# if __name__ == '__main__':
#     main()







# async def fetch_sensor_data(uri, model, configs):
#     seq_len = configs['data']['sequence_length']
#     sensor_data = []
#     predictions_data = []
#     live_data = np.zeros(seq_len)  # Initialize with zeros
    
#     # Initialize real-time graph (not needed anymore if you are not plotting)
#     plt.ion()  

#     async with websockets.connect(uri) as websocket:
#         while True:
#             i = 0
#             while i < seq_len - 1:  # Collect enough data for the sequence
#                 try:
#                     message = await websocket.recv()  # Receive WebSocket message
#                     data = json.loads(message)       # Assume WebSocket sends JSON
                    
#                     # Check if the message contains the "temperature" key
#                     if "temperature" in data:
#                         temperature_value = float(data.get("temperature", 0))  # Extract temperature value
#                         live_data[i] = temperature_value
#                         # print(temperature_value)
#                         sensor_data.append(temperature_value)
#                         i += 1  # Increment only when valid data is added
                    
#                 except (ValueError, KeyError) as e:
#                     print(f"Error processing WebSocket message: {e}")
#                     continue

#             # Prepare data for prediction
#             sensor_struct_data = live_data[np.newaxis, :, np.newaxis]  # Prepare for LSTM
#             predictions = model.predict_sequence_live(sensor_struct_data, seq_len)
#             predictions_data.append(predictions)

#             # Send predictions to the API instead of plotting
#             if predictions_data:
#                 # Extract raw and predicted values (assuming predictions are in a format that can be extracted this way)
#                 raw_value = float(sensor_data[-1])  # Convert to Python float
#                 predicted_value = float(predictions[-1])  # Convert to Python float

#                 # Round to 2 decimal places
#                 raw_value = round(raw_value, 2)
#                 predicted_value = round(predicted_value, 2)

#                 # Prepare data for API
#                 payload = {
#                     "raw": raw_value,
#                     "pridict": predicted_value
#                 }
#                 print(payload)

#                 # Send data to the API
#                 try:
#                     response = requests.post("http://localhost:8000/forecast/", json=payload)
#                     if response.status_code == 200:
#                         print(f"Data successfully sent to API: {payload}")
#                     else:
#                         print(f"Failed to send data. Status code: {response.status_code}")
#                 except Exception as e:
#                     print(f"Error sending data to API: {e}")

#             # Train every 10 sequences
#             if len(sensor_data) > 10 * seq_len:
#                 np.savetxt('data/sensor.csv', sensor_data, delimiter=',', header='sensor_value')

#                 # Load data for training
#                 data = DataLoader(
#                     os.path.join('data', configs['data']['filename']),
#                     configs['data']['train_test_split'],
#                     configs['data']['columns']
#                 )
#                 x, y = data.get_train_data(
#                     seq_len=configs['data']['sequence_length'],
#                     normalise=configs['data']['normalise']
#                 )

#                 # Train the model
#                 model.train(
#                     x,
#                     y,
#                     epochs=configs['training']['epochs'],
#                     batch_size=configs['training']['batch_size'],
#                     save_dir=configs['model']['save_dir']
#                 )
#                 sensor_data = sensor_data[-100:]  # Keep recent data



# def main():
#     configs = json.load(open('config.json', 'r'))
#     if not os.path.exists(configs['model']['save_dir']):
#         os.makedirs(configs['model']['save_dir'])

#     model = Model()
#     model.build_model(configs)

#     uri = "ws://localhost:8000/ws/sensors/"  # WebSocket URI

#     # Start the asyncio event loop
#     asyncio.run(fetch_sensor_data(uri, model, configs))

# if __name__ == '__main__':
#     main()


import asyncio
import websockets
import json
import requests
import numpy as np
import os
import time

async def fetch_sensor_data(uri, model, configs):
    seq_len = configs['data']['sequence_length']
    sensor_data = []
    predictions_data = []
    live_data = np.zeros(seq_len)  # Initialize with zeros
    
    while True:
        try:
            async with websockets.connect(uri) as websocket:
                print("WebSocket connected")
                while True:
                    i = 0
                    while i < seq_len - 1:  # Collect enough data for the sequence
                        try:
                            message = await websocket.recv()  # Receive WebSocket message
                            data = json.loads(message)       # Assume WebSocket sends JSON
                            
                            # Check if the message contains the "temperature" key
                            if "temperature" in data:
                                temperature_value = float(data.get("temperature", 0))  # Extract temperature value
                                live_data[i] = temperature_value
                                sensor_data.append(temperature_value)
                                i += 1  # Increment only when valid data is added
                        
                        except (ValueError, KeyError) as e:
                            print(f"Error processing WebSocket message: {e}")
                            continue

                    # Prepare data for prediction
                    sensor_struct_data = live_data[np.newaxis, :, np.newaxis]  # Prepare for LSTM
                    predictions = model.predict_sequence_live(sensor_struct_data, seq_len)
                    predictions_data.append(predictions)

                    # Send predictions to the API instead of plotting
                    if predictions_data:
                        # Extract raw and predicted values (assuming predictions are in a format that can be extracted this way)
                        raw_value = float(sensor_data[-1])  # Convert to Python float
                        predicted_value = float(predictions[-1])  # Convert to Python float

                        # Round to 2 decimal places
                        raw_value = round(raw_value, 2)
                        predicted_value = round(predicted_value, 2)

                        # Prepare data for API
                        payload = {
                            "raw": raw_value,
                            "pridict": predicted_value
                        }
                        print(payload)

                        # Send data to the API
                        try:
                            response = requests.post("http://localhost:8000/forecast/", json=payload)
                            if response.status_code == 200:
                                print(f"Data successfully sent to API: {payload}")
                            else:
                                print(f"Failed to send data. Status code: {response.status_code}")
                        except Exception as e:
                            print(f"Error sending data to API: {e}")

                    # Train every 10 sequences
                    if len(sensor_data) > 10 * seq_len:
                        np.savetxt('data/sensor.csv', sensor_data, delimiter=',', header='sensor_value')

                        # Load data for training
                        data = DataLoader(
                            os.path.join('data', configs['data']['filename']),
                            configs['data']['train_test_split'],
                            configs['data']['columns']
                        )
                        x, y = data.get_train_data(
                            seq_len=configs['data']['sequence_length'],
                            normalise=configs['data']['normalise']
                        )

                        # Train the model
                        model.train(
                            x,
                            y,
                            epochs=configs['training']['epochs'],
                            batch_size=configs['training']['batch_size'],
                            save_dir=configs['model']['save_dir']
                        )
                        sensor_data = sensor_data[-100:]  # Keep recent data

        except websockets.exceptions.ConnectionClosedError as e:
            print(f"WebSocket connection closed with error: {e}. Attempting to reconnect...")
            await asyncio.sleep(5)  # Wait before reconnecting
            continue  # Reconnect to the WebSocket
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            await asyncio.sleep(5)  # Wait before retrying
            continue  # Keep retrying

def main():
    configs = json.load(open('config.json', 'r'))
    if not os.path.exists(configs['model']['save_dir']):
        os.makedirs(configs['model']['save_dir'])

    model = Model()
    model.build_model(configs)

    uri = "ws://localhost:8000/ws/sensors/"  # WebSocket URI

    # Start the asyncio event loop
    asyncio.run(fetch_sensor_data(uri, model, configs))

if __name__ == '__main__':
    main()
