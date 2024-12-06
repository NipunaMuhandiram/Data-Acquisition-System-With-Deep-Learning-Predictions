import React from 'react';
import SparklineChart from '../SparklineChart';

const VibrationSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Vibration Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} yaxisMax={10} label="Vibration Level" />
    </div>
  );
};

export default VibrationSensor;
