// // src/components/SoilMoistureSensor.js
// import React from 'react';
// import SparklineChart from './SparklineChart';

// const SoilMoistureSensor = ({ data, timestamps }) => {
//   return (
//     <div>
//       <h2>SoilMoistureSensor</h2>
//       <SparklineChart data={data} timestamps={timestamps} label="SoilMoistureSensor" />
//     </div>
//   );
// };

// export default SoilMoistureSensor;


import React from 'react';
import SparklineChart from '../SparklineChart';

const SoilMoistureSensor = ({ data, timestamps }) => {
  return (
    <div>
      <h2>Soil Moisture Sensor</h2>
      <SparklineChart data={data} timestamps={timestamps} label="Moisture Level" />
    </div>
  );
};

export default SoilMoistureSensor;
