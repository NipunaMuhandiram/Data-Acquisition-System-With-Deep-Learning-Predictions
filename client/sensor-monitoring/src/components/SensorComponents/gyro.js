// // src/components/GasSensor1.js
// import React from 'react';
// import SparklineChart from './SparklineChart';

// const GasSensor1 = ({ data, timestamps }) => {
//   return (
//     <div>
//       <h2>Gas Sensor 1</h2>
//       <SparklineChart data={data} timestamps={timestamps} label="Gas Level 1" />
//     </div>
//   );
// };

// export default GasSensor1;


// import React from 'react';
// import SparklineChart from '../SparklineChart';

// const GasSensor1 = ({ data, timestamps }) => {
//   return (
//     <div>
//       <h2>Gas Sensor 1</h2>
//       <SparklineChart data={data} timestamps={timestamps}  yaxisMax={1030} label="Gas Level 1" />
//     </div>
//   );
// };

// export default GasSensor1;



// acceleration_x
// : 
// 0.56
// acceleration_y
// : 
// 0.05
// acceleration_z
// : 
// -10.37
// altitude
// : 
// 69.57
// gyro_x
// : 
// -0
// gyro_y
// : 
// 0.02
// gyro_z
// : 
// 0
// light_intensity
// : 
// 843
// pressure
// : 
// 100492.14
// temperature
// : 
// 31.43
// timestamp
// : 
// "2024-12-02T08:27:23.420856"
// vibration_level
// : 
// 0



import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GasSensorChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    gyroX: [],
    gyroY: [],
    gyroZ: [],
    timestamps: [],
  });

  const maxDataPoints = 100; // Maximum number of data points to display

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const gyroX = newData.gyro_x;
      const gyroY = newData.gyro_y;
      const gyroZ = newData.gyro_z;

      // Convert timestamp to minutes and seconds
      const date = new Date(newData.timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds(); // Use minutes and seconds only

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift(); // Remove excess data if it exceeds maxDataPoints
        }

        return {
          gyroX: [...prevData.gyroX, gyroX].slice(-maxDataPoints),
          gyroY: [...prevData.gyroY, gyroY].slice(-maxDataPoints),
          gyroZ: [...prevData.gyroZ, gyroZ].slice(-maxDataPoints),
          timestamps: newTimestamps,
        };
      });
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: data.timestamps, // X-axis labels (timestamps)
    datasets: [
      {
        label: 'Gyro X',
        data: data.gyroX,
        borderColor: 'rgba(75, 192, 192, 1)', // Blueish color for visibility
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Blueish background color
        fill: 'origin', // Stack this dataset
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: 'Gyro Y',
        data: data.gyroY,
        borderColor: 'rgba(153, 102, 255, 1)', // Purple for visibility
        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Purple background color
        fill: 'origin', // Stack this dataset
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: 'Gyro Z',
        data: data.gyroZ,
        borderColor: 'rgba(255, 159, 64, 1)', // Orange for visibility
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // Orange background color
        fill: 'origin', // Stack this dataset
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true, // Enable stacking on the x-axis
        title: {
          display: true,
          text: 'Time (Minutes)',
        },
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
        title: {
          display: true,
          text: 'Gyro Values',
        },
        suggestedMin: -1,
        suggestedMax: 1,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: { duration: 0 }, // Disable animation for real-time updates
  };

  return (
    <div style={{ height: '430px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center' }}>Real-Time GyroScope Sensor Data</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default GasSensorChart;
