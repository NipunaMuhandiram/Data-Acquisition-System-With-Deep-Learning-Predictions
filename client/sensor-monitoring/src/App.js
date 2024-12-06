// src/App.js
import React from 'react';
import './App.css';
import SensorDashboard from './components/SensorDashboard';

function App() {
  return (
    <div className="App">
      <SensorDashboard />
    </div>
  );
}

export default App;










// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/archived/Dashboard';
// import GasSensor1 from './components/SensorComponents/GasSensor1';
// import GasSensor2 from './components/SensorComponents/GasSensor2';
// import LightSensor from './components/SensorComponents/LightSensor';
// import VibrationSensor from './components/SensorComponents/VibrationSensor';
// import HumidityPressureSensor from './components/SensorComponents/HumidityPressureSensor';
// import SoilMoistureSensor from './components/SensorComponents/SoilMoistureSensor';

// const App = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//   });

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       const newSensorData = { ...sensorData };

//       if (data.sensor_id === 'gas_sensor_1') {
//         newSensorData.gasSensor1.data.push(data.gas_level);
//         newSensorData.gasSensor1.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         newSensorData.gasSensor2.data.push(data.gas_level);
//         newSensorData.gasSensor2.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'light_sensor') {
//         newSensorData.lightSensor.data.push(data.light_intensity);
//         newSensorData.lightSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'vibration_sensor') {
//         newSensorData.vibrationSensor.data.push(data.vibration_level);
//         newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         newSensorData.humidityPressureSensor.data.push(data.humidity);
//         newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         newSensorData.soilMoistureSensor.data.push(data.moisture_level);
//         newSensorData.soilMoistureSensor.timestamps.push(data.timestamp);
//       }

//       // Keep only the last 20 data points for visualization
//       Object.keys(newSensorData).forEach((key) => {
//         if (newSensorData[key].data.length > 20) {
//           newSensorData[key].data.shift();
//           newSensorData[key].timestamps.shift();
//         }
//       });

//       setSensorData(newSensorData);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, [sensorData]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/gas-sensor-1" element={<GasSensor1 
//           data={sensorData.gasSensor1.data} 
//           timestamps={sensorData.gasSensor1.timestamps} 
//         />} />
//         <Route path="/gas-sensor-2" element={<GasSensor2 
//           data={sensorData.gasSensor2.data} 
//           timestamps={sensorData.gasSensor2.timestamps} 
//         />} />
//         <Route path="/light-sensor" element={<LightSensor 
//           data={sensorData.lightSensor.data} 
//           timestamps={sensorData.lightSensor.timestamps} 
//         />} />
//         <Route path="/vibration-sensor" element={<VibrationSensor 
//           data={sensorData.vibrationSensor.data} 
//           timestamps={sensorData.vibrationSensor.timestamps} 
//         />} />
//         <Route path="/humidity-pressure-sensor" element={<HumidityPressureSensor 
//           data={sensorData.humidityPressureSensor.data} 
//           timestamps={sensorData.humidityPressureSensor.timestamps} 
//         />} />
//         <Route path="/soil-moisture-sensor" element={<SoilMoistureSensor 
//           data={sensorData.soilMoistureSensor.data} 
//           timestamps={sensorData.soilMoistureSensor.timestamps} 
//         />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
