import React from 'react';
import SparklineChart from '../SparklineChart';

const LightSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Light Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={1000} label="Light Intensity (lux)" />
    </div>
  );
};

export default LightSensor;
