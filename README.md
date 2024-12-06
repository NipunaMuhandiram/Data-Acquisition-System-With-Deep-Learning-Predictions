# Data-Aquisition-System-With-Deep-Learning-Predictions

# Sensor Data Monitoring System

This project is a real-time sensor data monitoring system that consists of a **React** frontend, a **Django** backend, and data from an **AVR ATmega328P** microcontroller transmitted via a **UART connection**.

## Snapshots of PCB Design
![2](https://github.com/user-attachments/assets/a1996713-70c3-48d4-8944-9e4949e2b307)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Frontend (React)](#frontend-react)
- [Backend (Django)](#backend-django)
- [Hardware Setup (AVR ATmega328P)](#hardware-setup-avr-atmega328p)
- [WebSocket Connection](#websocket-connection)
- [Database](#database)
- [Installation](#installation)
- [Usage](#usage)
  
## Introduction

This project collects sensor data from various sources (such as gas sensors, light sensors, humidity/pressure sensors, etc.) connected to an **ATmega328P** microcontroller via UART. The data is sent to the backend (Django), processed, and displayed in real-time on a web dashboard built with **React**. The communication between the backend and frontend is achieved using **WebSockets** for real-time updates.

## Features

- **Real-time Sensor Data Monitoring**: See live updates from the sensors on the web dashboard.
- **WebSocket Integration**: Real-time updates without data loss.
- **Django REST API**: Data Processing and CRUD operations on sensor data .
- **Database Storage**: Sensor data stored in a SQLite database.
- **React Frontend**: Clean, modern web interface for viewing sensor data.
- **Hardware**: AVR ATmega328P microcontroller.

## Schematic
![Schematic_datalogger](https://github.com/user-attachments/assets/40268e44-2f6b-4749-bd0a-a4857c508cce)

## System Architecture

- **Frontend**: React application for displaying sensor data in real-time.
- **Backend**: Django-based REST API for handling sensor data and WebSocket server for live updates.
- **Hardware**: AVR ATmega328P microcontroller to collect sensor data and send it via UART to the backend.
- **Database**: SQLite database for storing sensor readings.

## Frontend (React)

The frontend is built using **React** and communicates with the backend via WebSockets to receive real-time data.

### Key Libraries:
- **Axios**: For API calls to the Django backend.
- **WebSocket API**: For real-time communication.
- **Chart.js/Plotly.js**: For visualizing sensor data.

### To Run the Frontend:
1. Navigate to the `frontend` directory:
    ```bash
    cd client
    cd sensor-monitoring
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend (Django)

The Django backend is responsible for receiving data from the UART connection (via a serial port), saving it to a database, and broadcasting the data to WebSocket clients.

### Key Components:
- **Django REST Framework (DRF)**: Provides API endpoints for sensor data.
- **Channels**: Django package to handle WebSocket connections for real-time data updates.
- **Serial Communication**: Reads sensor data from the UART connection and forwards it to the Django app.

### To Run the Backend:
1. Navigate to the `backend` directory:
    ```bash
    cd server
    cd sensor_monitoring
    ```

2. Install dependencies (preferably in a virtual environment):
    ```bash
    python -m venv env
    env\Scripts\activate     - For windows
    pip install -r requirements.txt
    ```

3. Apply database migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

4. Run the development server:
    ```bash
    python manage.py runserver
    ```

5. Open [http://localhost:8000](http://localhost:8000) to access the backend.

## Hardware Setup (AVR ATmega328P)

The **ATmega328P** microcontroller reads sensor data and transmits it over **UART** to the backend server.


### Required Hardware:
- ATmega328P Microcontroller
- Sensors (e.g., gas sensor, light sensor, Pressure sensor)
- UART Communication setup
- USB-to-Serial Converter (for connecting to your computer)

### Key Aspects of the UART Communication:
- **Baud Rate**: Set the correct baud rate to match the UART settings on both the microcontroller and the server.
- **AVR Code**: The microcontroller reads sensor values and sends them over UART using `USART` in AVR C.
    - Example (AVR C code):
      ```c
      #define F_CPU 16000000UL
      #define BAUD 9600
      #define MYUBRR F_CPU/16/BAUD-1

      void USART_Init(unsigned int ubrr) {
          // Set baud rate
          UBRR0H = (unsigned char)(ubrr>>8);
          UBRR0L = (unsigned char)ubrr;
          // Enable receiver and transmitter
          UCSR0B = (1<<RXEN0)|(1<<TXEN0);
      }

      void USART_Transmit(unsigned char data) {
          while (!(UCSR0A & (1<<UDRE0)));  // Wait for empty transmit buffer
          UDR0 = data;  // Send data
      }

      int main(void) {
          USART_Init(MYUBRR);
          while (1) {
              USART_Transmit(sensor_data);  // Send sensor data over UART
          }
      }
      ```

### Connecting to the Django Backend:
- Use a **Python script** to read UART data from the microcontroller and forward it to the Django backend:
- Example (Python code):
    ```python
    import serial
    import requests

    # Setup the serial port
    ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)

    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            data = {"sensor_id": "gas_sensor_1", "gas_level": float(line)}
            requests.post('http://localhost:8000/api/gas-sensor-1/', json=data)
    ```

## WebSocket Connection

The system uses **WebSockets** to send real-time data from the backend to the frontend. Django **Channels** are used to manage WebSocket connections.

### Setting Up WebSockets:
1. Create a WebSocket connection in the frontend to listen for real-time updates.
    ```javascript
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');
    socket.onmessage = function (event) {
        const sensorData = JSON.parse(event.data);
        console.log(sensorData);  // Process and update the UI
    };
    ```

2. The backend uses Django Channels to handle WebSocket connections and send data to the frontend whenever a new sensor reading is saved.

## Database

The backend uses **SQLite** (or **PostgreSQL** for production) to store sensor data.

### Key Tables:
- **GasSensor1**
- **GasSensor2**
- **LightSensor**
- **VibrationSensor**
- **HumidityPressureSensor**
- **SoilMoistureSensor**

Each table logs the sensor data with a timestamp.

## Installation

### Prerequisites:
- Python 3.x
- Node.js and npm
- PostgreSQL (optional for production)

### Hardware Setup:

- Flash the ATmega328P microcontroller with the provided UART code.
- Connect the UART to a USB-to-Serial converter and plug it into your machine.

## Usage

1. Ensure the backend Django server is running.
2. Ensure the frontend React app is running.
3. Ensure your microcontroller is connected and transmitting data via UART.
4. Open the web dashboard (http://localhost:3000) to monitor real-time sensor data.

#### AVR Commands
avrdude -p m328P -c usbasp -P usb -U lfuse:w:0xE2:m -U hfuse:w:0xD9:m -U efuse:w:0xFF:m -U flash:w:"$(ProjectDir)Debug\$(TargetName).hex":i


