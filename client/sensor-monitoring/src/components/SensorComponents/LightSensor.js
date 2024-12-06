// // // src/components/LightSensor.js
// // import React from 'react';
// // import SparklineChart from './SparklineChart';

// // const LightSensor = ({ data, timestamps }) => {
// //   return (
// //     <div>
// //       <h2>LightSensor</h2>
// //       <SparklineChart data={data} timestamps={timestamps} label="LightSensor" />
// //     </div>
// //   );
// // };

// // export default LightSensor;


// // import React from 'react';
// // import SparklineChart from '../SparklineChart';

// // const LightSensor = ({ data, timestamps }) => {
// //   return (
// //     <div>
// //       <h2>Light Sensor</h2>
// //       <SparklineChart data={data} timestamps={timestamps}   label="Light Intensity" />
// //     </div>
// //   );
// // };

// // export default LightSensor;



// import React, { useEffect, useRef } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const LightIntensityChart = () => {
//   const chartRef = useRef(null);
//   const dataPointsRef = useRef([]);
//   const timestampsRef = useRef([]);

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       const lightIntensity = newData.light_intensity;
//       const timestamp = newData.timestamp;

//       if (dataPointsRef.current.length >= 100) {
//         dataPointsRef.current.shift();
//         timestampsRef.current.shift();
//       }

//       dataPointsRef.current.push(lightIntensity);
//       timestampsRef.current.push(timestamp);

//       if (chartRef.current) {
//         chartRef.current.data.labels = timestampsRef.current;
//         chartRef.current.data.datasets[0].data = dataPointsRef.current;
//         chartRef.current.update('none');
//       }
//     };

//     return () => socket.close();
//   }, []);

//   const chartData = {
//     labels: timestampsRef.current,
//     datasets: [
//       {
//         label: 'Light Intensity',
//         data: dataPointsRef.current,
//         borderColor: 'rgba(255, 159, 64, 1)',
//         backgroundColor: 'rgba(255, 159, 64, 0.2)',
//         tension: 0.3,
//         pointRadius: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: { display: false },
//       y: { suggestedMin: 0, suggestedMax: 100 },
//     },
//     plugins: { legend: { display: true } },
//     animation: { duration: 0 },
//   };

//   return (
//     <div style={{ height: '300px', width: '100%' }}>
//       <Line ref={chartRef} data={chartData} options={options} />
//     </div>
//   );
// };

// export default LightIntensityChart;




import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LightIntensityChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    light_intensity: [],
    timestamps: []
  });

  const maxDataPoints = 100; // Maximum number of data points to display

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const lightIntensity = newData.light_intensity;
      const timestamp = newData.timestamp;

      // Convert timestamp to minutes and seconds
      const date = new Date(timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds(); // Minutes and seconds only

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift(); // Remove excess data if it exceeds maxDataPoints
        }

        return {
          light_intensity: [...prevData.light_intensity, lightIntensity].slice(-maxDataPoints),
          timestamps: newTimestamps
        };
      });
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: data.timestamps, // X-axis labels (timestamps in minutes)
    datasets: [
      {
        label: 'Light Intensity',
        data: data.light_intensity,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
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
          text: 'Time (Minutes)', // Label for the X-axis
        },
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
        title: {
          display: true,
          text: 'Light Intensity',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: {
      duration: 0, // Disable animation for real-time updates
    },
  };

  return (
    <div style={{ height: '430px', width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Real-Time Light Intensity</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LightIntensityChart;
