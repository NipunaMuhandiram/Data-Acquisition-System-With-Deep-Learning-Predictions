import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const chartRef = useRef(null); // Ref to store the chart instance
  const [data, setData] = useState({
    temperature: [],
    lightIntensity: [],
    vibrationLevel: [],
    acceleration_x: [],
    acceleration_y: [],
    acceleration_z: [],
    altitude: [],
    timestamps: []
  });

  const maxDataPoints = 11; // Maximum number of data points to display

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      // Convert timestamp to minutes (only minutes part)
      const date = new Date(newData.timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds(); // Use only minutes and seconds

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift(); // Remove excess data if it exceeds maxDataPoints
        }

        return {
          temperature: [...prevData.temperature, newData.temperature].slice(-maxDataPoints),
          lightIntensity: [...prevData.lightIntensity, newData.light_intensity].slice(-maxDataPoints),
          vibrationLevel: [...prevData.vibrationLevel, newData.vibration_level].slice(-maxDataPoints),
          acceleration_x: [...prevData.acceleration_x, newData.acceleration_x].slice(-maxDataPoints),
          acceleration_y: [...prevData.acceleration_y, newData.acceleration_y].slice(-maxDataPoints),
          acceleration_z: [...prevData.acceleration_z, newData.acceleration_z].slice(-maxDataPoints),
          altitude: [...prevData.altitude, newData.altitude].slice(-maxDataPoints),
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
        label: 'Temperature',
        data: data.temperature,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: 'origin', // Stack this dataset
        tension: 0.3
      },
      {
        label: 'Light Intensity',
        data: data.lightIntensity,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: 'origin',
        tension: 0.3
      },
      {
        label: 'Vibration Level',
        data: data.vibrationLevel,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: 'origin',
        tension: 0.3
      },
      {
        label: 'Acceleration X',
        data: data.acceleration_x,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: 'origin',
        tension: 0.3
      },
      {
        label: 'Acceleration Y',
        data: data.acceleration_y,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: 'origin',
        tension: 0.3
      },
      {
        label: 'Acceleration Z',
        data: data.acceleration_z,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: 'origin',
        tension: 0.3
      },
      {
        label: 'Altitude',
        data: data.altitude,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: 'origin',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true, // Enable stacking on the x-axis
        title: {
          display: true,
          text: 'Time (Minutes)'
        }
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
        title: {
          display: true,
          text: 'Sensor Value'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div style={{ height: '430px', width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Real-Time Sensor Data</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default Home;
