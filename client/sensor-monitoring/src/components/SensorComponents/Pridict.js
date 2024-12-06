// // import React, { useEffect, useState } from 'react';
// // import ReactApexChart from 'react-apexcharts'; // Make sure you have this package installed
// // import ApexCharts from 'apexcharts';

// // const Home = ({ sensorData }) => {
// //   const [series, setSeries] = useState([]);
// //   const [options, setOptions] = useState({
// //     chart: {
// //       id: 'realtime',
// //       height: 350,
// //       type: 'line',
// //       animations: {
// //         enabled: true,
// //         easing: 'linear',
// //         dynamicAnimation: {
// //           speed: 1000
// //         }
// //       },
// //       toolbar: {
// //         show: false
// //       },
// //       zoom: {
// //         enabled: false
// //       }
// //     },
// //     dataLabels: {
// //       enabled: false
// //     },
// //     stroke: {
// //       curve: 'smooth'
// //     },
// //     title: {
// //       text: 'Sensor Data Dashboard',
// //       align: 'left'
// //     },
// //     markers: {
// //       size: 0
// //     },
// //     xaxis: {
// //       type: 'datetime',
// //     },
// //     yaxis: {
// //       max: 100 // Set this according to your maximum sensor values
// //     },
// //     legend: {
// //       show: true,
// //       position: 'top'
// //     },
// //     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0','#FF7F50']
// //   });

// //   useEffect(() => {
// //     const updateSeries = () => {
// //       const newSeries = [
// //         {
// //           name: 'Gas Sensor 1',
// //           data: sensorData.gasSensor1.data.map((value, index) => [sensorData.gasSensor1.timestamps[index], value]),
// //         },
// //         {
// //           name: 'Gas Sensor 2',
// //           data: sensorData.gasSensor2.data.map((value, index) => [sensorData.gasSensor2.timestamps[index], value]),
// //         },
// //         {
// //           name: 'Light Sensor',
// //           data: sensorData.lightSensor.data.map((value, index) => [sensorData.lightSensor.timestamps[index], value]),
// //         },
// //         {
// //           name: 'Vibration Sensor',
// //           data: sensorData.vibrationSensor.data.map((value, index) => [sensorData.vibrationSensor.timestamps[index], value]),
// //         },
// //         {
// //           name: 'Humidity & Pressure',
// //           data: sensorData.humidityPressureSensor.data.map((value, index) => [sensorData.humidityPressureSensor.timestamps[index], value]),
// //         },
// //         {
// //           name: 'Soil Moisture',
// //           data: sensorData.soilMoistureSensor.data.map((value, index) => [sensorData.soilMoistureSensor.timestamps[index], value]),
// //         },
// //       ];

// //       setSeries(newSeries);
// //     };

// //     // Call updateSeries initially and on every sensorData change
// //     updateSeries();
// //   }, [sensorData]);

// //   return (
// //     <div>
// //       <h2>Home</h2>
// //       <div id="chart">
// //         <ReactApexChart options={options} series={series} type="line" height={350} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;











// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts'; // Ensure this package is installed

// const Home = ({ sensorData }) => {
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000
//         }
//       },
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: 'Sensor Data Dashboard',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: {
//         formatter: (value) => {
//           const date = new Date(value);
//           // Format the time in HH:mm format
//           return date.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit' });
//         }
//       }
//     },
//     yaxis: {
//       max: 1200 // Set this according to your maximum sensor values
//     },
//     legend: {
//       show: true,
//       position: 'top'
//     },
//     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0','#FF7F50']
//   });

//   useEffect(() => {
//     const updateSeries = () => {
//       const newSeries = [
//         {
//           name: 'Gas Sensor 1',
//           data: sensorData.gasSensor1.data.map((value, index) => {
//             const timestamp = sensorData.gasSensor1.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value]; // Get the timestamp in milliseconds
//           }),
//         },
//         {
//           name: 'Gas Sensor 2',
//           data: sensorData.gasSensor2.data.map((value, index) => {
//             const timestamp = sensorData.gasSensor2.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//         {
//           name: 'Light Sensor',
//           data: sensorData.lightSensor.data.map((value, index) => {
//             const timestamp = sensorData.lightSensor.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//         {
//           name: 'Vibration Sensor',
//           data: sensorData.vibrationSensor.data.map((value, index) => {
//             const timestamp = sensorData.vibrationSensor.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//         {
//           name: 'Humidity & Pressure',
//           data: sensorData.humidityPressureSensor.data.map((value, index) => {
//             const timestamp = sensorData.humidityPressureSensor.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//         {
//           name: 'Soil Moisture',
//           data: sensorData.soilMoistureSensor.data.map((value, index) => {
//             const timestamp = sensorData.soilMoistureSensor.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//       ];

//       setSeries(newSeries);
//     };

//     // Call updateSeries initially and on every sensorData change
//     updateSeries();
//   }, [sensorData]);

//   return (
//     <div>
//       <h2>Home</h2>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="line" height={350} />
//       </div>
//     </div>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts'; // Ensure this package is installed

// const Pridict = ({ sensorData }) => {
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000
//         }
//       },
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: 'Sensor Data Dashboard',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: {
//         formatter: (value) => {
//           const date = new Date(value);
//           return date.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit' });
//         }
//       }
//     },
//     yaxis: {
//       max: 100 // This will be replaced dynamically
//     },
//     legend: {
//       show: true,
//       position: 'top'
//     },
//     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#FF7F50']
//   });

//   useEffect(() => {
//     const updateSeries = () => {
//       const newSeries = [
//         {
//           name: 'raw data',
//           data: sensorData.pridictionData.raw.map((value, index) => {
//             const timestamp = sensorData.pridictionData.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
//         {
//           name: 'Pridiction data',
//           data: sensorData.pridictionData.prdt.map((value, index) => {
//             const timestamp = sensorData.pridictionData.timestamps[index];
//             const date = new Date(timestamp);
//             return [date.getTime(), value];
//           }),
//         },
        
        
//       ];

//       setSeries(newSeries);

//       // Calculate the dynamic maximum value for Y-axis
//       const allData = [
//         ...sensorData.pridictionData.data,
  
//       ];
//       const maxY = Math.max(...allData, 100); // Ensure there's a minimum value for Y-axis

//       setOptions((prevOptions) => ({
//         ...prevOptions,
//         yaxis: {
//           max: Math.ceil(maxY) // Round up to ensure the chart doesn't cut off at the maximum
//         }
//       }));
//     };

//     // Call updateSeries initially and on every sensorData change
//     updateSeries();
//   }, [sensorData]);

//   return (
//     <div>
//       <h2>pridictions</h2>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="line" height={350} />
//       </div>
//     </div>
//   );
// };

// export default Pridict;









// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts'; // Ensure this package is installed

// const Pridict = ({ sensorData }) => {
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000
//         }
//       },
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: 'Temperature Pridictions Using DeepLearning (LSTM Model)',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: {
//         formatter: (value) => {
//           const date = new Date(value);
//           return date.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit' });
//         }
//       }
//     },
//     yaxis: {
//       max: 100 // This will be replaced dynamically
//     },
//     legend: {
//       show: true,
//       position: 'top'
//     },
//     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#FF7F50']
//   });

//   // Buffer for raw data points
//   const [rawDataBuffer, setRawDataBuffer] = useState([]);

//   useEffect(() => {
//     const updateSeries = () => {
//       const now = Date.now(); // Current timestamp in milliseconds

//       // Add new raw data points to the buffer
//       const updatedBuffer = [...rawDataBuffer];
//       sensorData.pridictionData.raw.forEach((value, index) => {
//         const timestamp = new Date(sensorData.pridictionData.timestamps[index]).getTime();
//         updatedBuffer.push({ timestamp, value });
//       });

//       // Filter the buffer to include only raw data points delayed by at least 1 minute
//       const delayedRawData = updatedBuffer.filter(({ timestamp }) => now - timestamp >= 60000);

//       // Remove processed points from the buffer
//       const remainingBuffer = updatedBuffer.filter(({ timestamp }) => now - timestamp < 60000);
//       setRawDataBuffer(remainingBuffer);

//       // Prepare series for plotting
//       const newSeries = [
//         {
//           name: 'Prediction data',
//           data: sensorData.pridictionData.prdt.map((value, index) => {
//             const timestamp = sensorData.pridictionData.timestamps[index];
//             return [new Date(timestamp).getTime(), value];
//           }),
//         },
//         {
//           name: 'Raw data',
//           data: delayedRawData.map(({ timestamp, value }) => [timestamp, value]),
//         },
//       ];

//       setSeries(newSeries);

//       // Dynamically adjust Y-axis maximum
//       const allData = [
//         ...sensorData.pridictionData.prdt,
//         ...delayedRawData.map(({ value }) => value),
//       ];
//       const maxY = Math.max(...allData, 100);

//       setOptions((prevOptions) => ({
//         ...prevOptions,
//         yaxis: {
//           max: Math.ceil(maxY), // Ensure the maximum value is rounded up
//         }
//       }));
//     };

//     // Call updateSeries initially and whenever sensorData changes
//     updateSeries();
//   }, [sensorData, rawDataBuffer]);

//   return (
//     <div>
//       <h2>Predictions</h2>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="line" height={350} />
//       </div>
//     </div>
//   );
// };

// export default Pridict;











import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Pridict = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    rawData: [],
    predictionData: [],
    timestamps: [],
  });

  const maxDataPoints = 100; // Maximum number of data points to display
  const delay = 2500; // Delay of 2 seconds (in milliseconds)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      if (newData.pridicts && newData.pridicts.length > 0) {
        const pridict = newData.pridicts[0]; // Assuming we're using the first prediction

        const raw = pridict.raw;
        const prediction = pridict.pridict;
        console.log('Raw:', raw);
        console.log('Prediction:', prediction);

        // Convert timestamp to minutes and seconds
        const date = new Date(pridict.timestamp);
        const minutes = date.getMinutes() + ':' + date.getSeconds();

        setData((prevData) => {
          const newTimestamps = [...prevData.timestamps, minutes];
          if (newTimestamps.length > maxDataPoints) {
            newTimestamps.shift(); // Remove excess data if it exceeds maxDataPoints
          }

          return {
            rawData: [...prevData.rawData, raw].slice(-maxDataPoints),
            predictionData: [...prevData.predictionData, prediction].slice(-maxDataPoints),
            timestamps: newTimestamps,
          };
        });

        // Simulate the delayed raw data by adding a timeout
        setTimeout(() => {
          setData((prevData) => {
            const newTimestamps = [...prevData.timestamps];
            const delayedRawData = [...prevData.rawData];
            delayedRawData.push(raw);
            if (delayedRawData.length > maxDataPoints) {
              delayedRawData.shift(); // Remove excess data if it exceeds maxDataPoints
            }

            return {
              rawData: delayedRawData,
              predictionData: prevData.predictionData,
              timestamps: newTimestamps,
            };
          });
        }, delay); // 2-second delay for raw data
      }
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: data.timestamps, // X-axis labels (timestamps)
    datasets: [
      {
        label: 'Raw Data',
        data: data.rawData,
        borderColor: 'rgba(75, 192, 192, 1)', // Blueish color for raw data
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Blueish background color
        fill: 'origin',
        tension: 0.3, // Apply some tension for smooth curves
        cubicInterpolationMode: 'monotone', // Use monotone interpolation for smoothness
        pointRadius: 0,
      },
      {
        label: 'Predicted Data',
        data: data.predictionData,
        borderColor: 'rgba(153, 102, 255, 1)', // Purple for predicted data
        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Purple background color
        fill: 'origin',
        tension: 0.3, // Apply some tension for smooth curves
        cubicInterpolationMode: 'monotone', // Use monotone interpolation for smoothness
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Minutes)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        stacked: false, // Disable stacking on the Y-axis
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: {
      duration: 1000, // Set duration of animation to 1 second
      easing: 'easeOutQuad', // Apply easing function for smooth transition
    },
  };

  return (
    <div style={{ height: '430px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center' }}>Real-Time Temperature Predictions</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default Pridict;
