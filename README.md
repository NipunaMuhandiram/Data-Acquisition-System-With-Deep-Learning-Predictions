# Real-Time Sensor Monitoring System with Deep Learning Temperature Predictions

## Project Overview

This advanced project is a comprehensive real-time sensor data monitoring system featuring:
- **React** Frontend
- **Django** Backend
- **AVR ATmega328P** Microcontroller
- **Deep Learning LSTM Model** for Temperature Predictions

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
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This project integrates sensor data collection, real-time monitoring, and advanced temperature predictions using deep learning. By leveraging an **ATmega328P** microcontroller, **Django** backend, **React** frontend, and an **LSTM neural network**, we provide a comprehensive solution for sensor data analysis and forecasting.

## Schematic
![System Schematic](https://github.com/user-attachments/assets/40268e44-2f6b-4749-bd0a-a4857c508cce)

## Features

- **Real-Time Sensor Data Monitoring**
  - Live updates from multiple sensors
  - Web dashboard with interactive visualizations

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
   - UART communication

2. **Backend Layer**
   - Django REST Framework
   - WebSocket server (Django Channels)
   - LSTM prediction model
   - SQLite/PostgreSQL database

3. **Frontend Layer**
   - React application
   - Real-time data visualization
   - WebSocket client

## Technologies Used

- **Frontend**: React, Axios, WebSocket API, Chart.js/Plotly.js
- **Backend**: Django, Django REST Framework, Django Channels
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

## WebSocket Real-Time Communication

### Frontend WebSocket Setup
```javascript
const socket = new WebSocket('ws://localhost:8000/ws/sensors/');
socket.onmessage = function (event) {
    const sensorData = JSON.parse(event.data);
    updateDashboard(sensorData);
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

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm
- AVR Toolchain

## Usage

1. Setup hardware
2. Start Django backend
3. Launch React frontend
4. Open web dashboard
5. Monitor real-time sensor data and predictions



