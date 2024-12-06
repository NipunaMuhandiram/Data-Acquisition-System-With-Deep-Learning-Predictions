import React from 'react';
import SparklineChart from '../SparklineChart';

const PressureSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Pressure Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={110000} label="Pressure (Pa)" />
    </div>
  );
};

export default PressureSensor;
