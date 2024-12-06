// // src/components/SparklineChart.js
// import * as React from 'react';
// import { LineChart } from '@mui/x-charts';

// const SparklineChart = ({ data, timestamps, label }) => {
//   // Prepare data labels for X-axis based on timestamps in seconds
//   const xLabels = timestamps.map((timestamp) => new Date(timestamp).toLocaleTimeString());

//   return (
//     <LineChart
//       width={750}
//       height={350}
//       series={[{ data, label }]}
//       xAxis={[{ scaleType: 'point', data: xLabels }]}
//       yAxis={[{ min: 0, max: 100 }]}  // Fixed Y-range
//     />
//   );
// };

// export default SparklineChart;





// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const SparklineChart = ({ data, timestamps, yaxisMax }) => {
//   // Prepare the series data
//   const seriesData = [{
//     name: 'Sensor Data',
//     data: data.slice() // Clone data array to avoid mutation
//   }];

//   const options = {
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000 // Update speed in milliseconds
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
//       text: 'Real-time Sensor Data',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'datetime',
//       categories: timestamps.map((timestamp) => new Date(timestamp).getTime()), // Convert timestamps to milliseconds for ApexCharts
//       labels: {
//         formatter: (val) => new Date(val).toLocaleTimeString()
//       }
//     },
//     yaxis: {
//       max: yaxisMax || 1000, // Set fixed maximum for Y-axis
//     },
//     legend: {
//       show: false
//     },
//   };

//   return (
//     <div>
//       <ReactApexChart options={options} series={seriesData} type="line" height={350} />
//     </div>
//   );
// };

// export default SparklineChart;




import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SparklineChart = ({ data, timestamps }) => {
  // Dynamically determine the max value from the data for the Y-axis
  const maxValue = Math.max(...data, 100); // Ensure there's a minimum max value of 100

  const seriesData = [{
    name: 'Sensor Data',
    data: data.slice() // Clone data array to avoid mutation
  }];

  const options = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000 // Update speed in milliseconds
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Real-time Sensor Data',
      align: 'left'
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      categories: timestamps.map((timestamp) => new Date(timestamp).getTime()), // Convert timestamps to milliseconds for ApexCharts
      labels: {
        formatter: (val) => new Date(val).toLocaleTimeString()
      }
    },
    yaxis: {
      max: Math.ceil(maxValue), // Set dynamic max value for Y-axis
    },
    legend: {
      show: false
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={seriesData} type="line" height={350} />
    </div>
  );
};

export default SparklineChart;
