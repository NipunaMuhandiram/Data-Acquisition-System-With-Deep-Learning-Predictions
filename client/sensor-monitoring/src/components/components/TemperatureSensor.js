import React from 'react';
import SparklineChart from '../SparklineChart';

const TemperatureSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Temperature Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={50} label="Temperature (°C)" />
    </div>
  );
};

export default TemperatureSensor;
