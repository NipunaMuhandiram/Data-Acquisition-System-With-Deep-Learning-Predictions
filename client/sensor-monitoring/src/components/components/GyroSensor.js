import React from 'react';
import SparklineChart from '../SparklineChart';

const GyroSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Gyroscope Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={5} label="Gyroscope (°/s)" />
    </div>
  );
};

export default GyroSensor;
