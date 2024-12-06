// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const ApexChart = ({ data, timestamps }) => {
//   const [series, setSeries] = React.useState([{ data: [] }]);
//   const [options, setOptions] = React.useState({
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000,
//         },
//       },
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: 'smooth',
//     },
//     title: {
//       text: 'Real-Time Sensor Data',
//       align: 'left',
//     },
//     markers: {
//       size: 0,
//     },
//     xaxis: {
//       type: 'datetime',
//       categories: timestamps,
//     },
//     yaxis: {
//       max: 100, // Adjust based on your sensor's range
//     },
//     legend: {
//       show: false,
//     },
//   });

//   React.useEffect(() => {
//     if (data.length > 0 && timestamps.length > 0) {
//       // Update series data when new data comes in
//       setSeries([{ data }]);
//       setOptions((prevOptions) => ({
//         ...prevOptions,
//         xaxis: {
//           categories: timestamps.map((ts) => new Date(ts).toLocaleTimeString()), // Format timestamps
//         },
//       }));
//     }
//   }, [data, timestamps]);

//   return (
//     <div>
//       <ReactApexChart options={options} series={series} type="line" height={350} />
//     </div>
//   );
// };

// export default ApexChart;



import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data, timestamps, yaxisMax }) => {
  const [series, setSeries] = React.useState([{ data: [] }]);
  const [options, setOptions] = React.useState({
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Real-Time Sensor Data',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      categories: timestamps,
    },
    yaxis: {
      max: yaxisMax, // Use the yaxisMax prop here
    },
    legend: {
      show: false,
    },
  });

  React.useEffect(() => {
    if (data.length > 0 && timestamps.length > 0) {
      // Update series data when new data comes in
      setSeries([{ data }]);
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: timestamps.map((ts) => new Date(ts).toLocaleTimeString()), // Format timestamps
        },
      }));
    }
  }, [data, timestamps]);

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApexChart;
