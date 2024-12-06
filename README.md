# Real-Time Sensor Data Aquisition System with Deep Learning Temperature Predictions

## Project Overview

This advanced project is a comprehensive real-time sensor data monitoring system featuring:
- **React** Frontend
- **Django** Backend
- **AVR ATmega328P** Microcontroller
- **Deep Learning LSTM Model** for Temperature Predictions
- **Manual and Automatic Device Control**
- **LED Indicator System**

## Project Frontend
![s1](https://github.com/user-attachments/assets/68e551da-fe88-4a4c-ac55-c454bbfcdd53)

## Project Snapshots

![PCB Design](https://github.com/user-attachments/assets/a1996713-70c3-48d4-8944-9e4949e2b307)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Frontend (React)](#frontend-react)
- [Backend (Django)](#backend-django)
- [Deep Learning Predictions](#deep-learning-predictions)
- [Hardware Setup (AVR ATmega328P)](#hardware-setup-avr-atmega328p)
- [WebSocket Real-Time Communication](#websocket-real-time-communication)
- [Database](#database)
- [Device Control System](#device-control-system)
- [Installation](#installation)
- [Usage](#usage)

## Project Intro
[daq.webm](https://github.com/user-attachments/assets/653e0ed0-3f4a-47c9-9a5c-95ba80689f10)

## Introduction

This project integrates sensor data collection, real-time monitoring, advanced temperature predictions, and comprehensive device control using an **ATmega328P** microcontroller, **Django** backend, **React** frontend, and an **LSTM neural network**. By leveraging an **ATmega328P** microcontroller, **Django** backend, **React** frontend, and an **LSTM neural network**, we provide a comprehensive solution for sensor data analysis, forecasting, and device management.

## Schematic
![System Schematic](https://github.com/user-attachments/assets/40268e44-2f6b-4749-bd0a-a4857c508cce)

## Features

- **Real-Time Sensor Data Monitoring**
  - Live updates from multiple sensors
  - Web dashboard with interactive visualizations

- **Device Control System**
  - Manual device control interface
  - Automatic device control based on sensor conditions
  - Support for 5 independent devices
  - Individual LED status indicators for each device
  - Configurable control rules and thresholds

- **Deep Learning Temperature Predictions**
  - LSTM model for accurate temperature forecasting
  - Real-time prediction updates
  - Historical data-driven predictions

- **WebSocket Integration**
  - Seamless, real-time data transmission
  - Minimal data loss
  - Instant sensor reading updates

- **Comprehensive Backend**
  - Django REST API
  - CRUD operations on sensor data
  - Efficient data processing

- **Modern Frontend**
  - React-based web interface
  - Interactive charts and graphs
  - Responsive design

## System Architecture

1. **Hardware Layer**
   - AVR ATmega328P microcontroller
   - Multiple sensors (temperature, pressure, etc.)
   - 5 controllable devices
   - LED indicators for device status
   - UART communication

2. **Backend Layer**
   - Django REST Framework
   - WebSocket server (Django Channels)
   - LSTM prediction model
   - Device control logic
   - SQLite/PostgreSQL database

3. **Frontend Layer**
   - React application
   - Real-time data visualization
   - Device control interface
   - WebSocket client

## Device Control System

### Features
- **Manual Control**
  - Individual on/off switches for each device
  - Real-time status updates
  - Override automatic control modes

- **Automatic Control**
  - Rule-based device management
  - Sensor threshold triggers
  - Configurable control parameters
  - Intelligent decision-making based on sensor data

### LED Indicator System
- Device On and Device Off indication 

### Control Modes
1. **Manual Mode**
   - Direct user control
   - Immediate device state changes

2. **Automatic Mode**
   - Predefined rules
   - Sensor-driven device management
   - Configurable thresholds

## Technologies Used

- **Frontend**: React, Axios, WebSocket API, Chart.js/Plotly.js
- **Backend**: Django, Django REST Framework, Django Channels
- **Device Control**: AVR GPIO, Interrupt-driven control
- **Deep Learning**: LSTM (Long Short-Term Memory) Neural Network
- **Hardware**: AVR ATmega328P, Various Sensors
- **Communication**: UART, WebSockets
- **Database**: SQLite/PostgreSQL

## Frontend (React)

### Key Libraries
- Axios
- WebSocket API
- Chart.js/Plotly.js

### Setup and Running
```bash
cd client/sensor-monitoring
npm install
npm start
```

## Backend (Django)

### Key Components
- Django REST Framework
- Django Channels
- Serial Communication Module
- LSTM Prediction Module
- Device Control Module

### Setup and Running
```bash
cd server/sensor_monitoring
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Deep Learning Predictions

### LSTM Temperature Prediction Model

The project integrates a Long Short-Term Memory (LSTM) neural network for temperature predictions:

- Uses historical sensor data for training
- Provides real-time temperature forecasts
- Supports multiple prediction horizons
- Adaptive learning from continuous sensor inputs

### Running Predictions
```bash
cd DeepLearning_Predictions
python run.py
```

## Hardware Setup (AVR ATmega328P)

### Required Hardware
- ATmega328P Microcontroller
- Sensors (Temperature, Pressure, etc.)
- USB-to-Serial Converter
- 5 Controllable Devices
- LED Indicators

### UART Communication Example
```c
void USART_Init(unsigned int ubrr) {
    UBRR0H = (unsigned char)(ubrr>>8);
    UBRR0L = (unsigned char)ubrr;
    UCSR0B = (1<<RXEN0)|(1<<TXEN0);
}

void USART_Transmit(unsigned char data) {
    while (!(UCSR0A & (1<<UDRE0)));
    UDR0 = data;
}
```

### Device Control Implementation
```c
// Device control and LED management
void initDeviceControl() {
    // Set device control pins as output
    DDRD |= 0b11111000;  // Pins for 5 devices
    DDRB |= 0b00000111;  // LED indicator pins

    // Initial device and LED states
    PORTD &= 0b00000111;  // Devices off
    PORTB &= 0b11111000;  // LEDs off
}

void setDeviceState(uint8_t device, bool state) {
    if (state) {
        PORTD |= (1 << (device + 3));  // Turn device on
        PORTB |= (1 << device);         // Turn corresponding LED on
    } else {
        PORTD &= ~(1 << (device + 3)); // Turn device off
        PORTB &= ~(1 << device);       // Turn corresponding LED off
    }
}
```

## WebSocket Real-Time Communication

### Frontend WebSocket Setup
```javascript
const socket = new WebSocket('ws://localhost:8000/ws/sensors/');
socket.onmessage = function (event) {
    const sensorData = JSON.parse(event.data);
    updateDashboard(sensorData);
};

// Device Control WebSocket
const deviceSocket = new WebSocket('ws://localhost:8000/ws/devices/');
deviceSocket.onmessage = function (event) {
    const deviceData = JSON.parse(event.data);
    updateDevicePanel(deviceData);
};
```

## Database

Supported Databases:
- SQLite (Development)
- PostgreSQL (Production)

### Sensor Data Tables
- MPU6050 Gyroscope
- SW420 Vibration Sensor
- LDR Light Sensor
- BMP280 Pressure Sensor
- Temperature Prediction Logs
- Device Control Logs

### Device Control Database Schema
- Device ID
- Device Name
- Current State
- Control Mode (Manual/Automatic)
- Trigger Conditions
- Last Updated Timestamp

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm
- AVR Toolchain

### Steps
1. Clone the repository
2. Setup Python virtual environment
3. Install backend dependencies
4. Setup frontend dependencies
5. Configure hardware connections
6. Setup database
7. Configure WebSocket settings

## Usage

1. Setup hardware
2. Configure device control rules
3. Start Django backend
4. Launch React frontend
5. Open web dashboard
6. Monitor sensors and control devices

### Configuration
- Set sensor thresholds
- Define automatic control rules
- Configure device priority
- Set LED indicator behaviors

## Troubleshooting
- Check UART communication
- Verify WebSocket connections
- Validate sensor calibration
- Ensure proper device wiring
- Review Django and React logs

## Contributing
- Fork the repository
- Create feature branches
- Submit pull requests
- Follow coding standards
- Update documentation

