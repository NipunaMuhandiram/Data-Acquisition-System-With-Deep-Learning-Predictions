
// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Sensor Monitoring Dashboard</h1>
      <h2>Choose a Sensor</h2>
      <ul>
        <li><Link to="/sensor/gas-sensor-1">Gas Sensor 1</Link></li>
        <li><Link to="/sensor/gas-sensor-2">Gas Sensor 2</Link></li>
        <li><Link to="/sensor/light-sensor">Light Sensor</Link></li>
        <li><Link to="/sensor/vibration-sensor">Vibration Sensor</Link></li>
        <li><Link to="/sensor/humidity-pressure-sensor">Humidity & Pressure Sensor</Link></li>
        <li><Link to="/sensor/soil-moisture-sensor">Soil Moisture Sensor</Link></li>
      </ul>
    </div>
  );
};

export default Home;
