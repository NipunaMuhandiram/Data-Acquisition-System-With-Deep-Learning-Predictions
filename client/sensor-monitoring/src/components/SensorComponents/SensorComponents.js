import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generic Sensor Chart Component
const GenericSensorChart = ({ data, timestamps, title, dataKey }) => {
  // Transform data for chart
  const chartData = data.map((value, index) => ({
    name: new Date(timestamps[index]).toLocaleTimeString(),
    [dataKey]: value
  }));

  return (
    <div className="sensor-chart">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Specific Sensor Components
const TemperatureSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Temperature Sensor" 
    dataKey="temperature" 
  />
);

const PressureSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Pressure Sensor" 
    dataKey="pressure" 
  />
);

const LightSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Light Intensity Sensor" 
    dataKey="lightIntensity" 
  />
);

const VibrationSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Vibration Sensor" 
    dataKey="vibrationLevel" 
  />
);

const AltitudeSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Altitude Sensor" 
    dataKey="altitude" 
  />
);

const AccelerometerXSensor = ({ data, timestamps }) => (
  <GenericSensorChart 
    data={data} 
    timestamps={timestamps} 
    title="Accelerometer X Sensor" 
    dataKey="accelerometerX" 
  />
);

// Placeholder components for other existing references
const Home = ({ sensorData }) => (
  <div className="home-dashboard">
    <h2>Sensor Overview</h2>
    {/* Add a summary view of sensor data */}
    <pre>{JSON.stringify(sensorData, null, 2)}</pre>
  </div>
);

const Device = ({ data, timestamps }) => (
  <div className="device-management">
    <h2>Device Management</h2>
    {/* Add device management controls */}
  </div>
);

const DataTable = ({ sensorData }) => (
  <div className="data-table">
    <h2>Sensor Data Table</h2>
    {/* Add a comprehensive data table */}
    <pre>{JSON.stringify(sensorData, null, 2)}</pre>
  </div>
);

const Predict = ({ sensorData }) => (
  <div className="predictions">
    <h2>Sensor Predictions</h2>
    {/* Add prediction logic or visualization */}
    <pre>{JSON.stringify(sensorData, null, 2)}</pre>
  </div>
);

const Navigation = ({ onSelect }) => (
  <div className="navigation-menu">
    <h3>Sensors</h3>
    <button onClick={() => onSelect('temperature')}>Temperature</button>
    <button onClick={() => onSelect('pressure')}>Pressure</button>
    <button onClick={() => onSelect('lightIntensity')}>Light Intensity</button>
    <button onClick={() => onSelect('vibrationLevel')}>Vibration</button>
    <button onClick={() => onSelect('altitude')}>Altitude</button>
    <button onClick={() => onSelect('Home')}>Home</button>
    <button onClick={() => onSelect('Device')}>Device</button>
    <button onClick={() => onSelect('Data')}>Data</button>
    <button onClick={() => onSelect('Predictions')}>Predictions</button>
  </div>
);

export { 
  TemperatureSensor, 
  PressureSensor, 
  LightSensor, 
  VibrationSensor, 
  AltitudeSensor, 
  AccelerometerXSensor, 
  Home, 
  Device, 
  DataTable, 
  Predict,
  Navigation 
};