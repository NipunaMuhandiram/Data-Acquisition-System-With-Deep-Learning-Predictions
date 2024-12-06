import React from 'react';
import SparklineChart from '../SparklineChart';

const AltitudeSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Altitude Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={200} label="Altitude (m)" />
    </div>
  );
};

export default AltitudeSensor;
