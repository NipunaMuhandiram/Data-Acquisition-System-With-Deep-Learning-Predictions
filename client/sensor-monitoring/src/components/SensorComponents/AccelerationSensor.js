import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AccelerationChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    acceleration_x: [],
    acceleration_y: [],
    acceleration_z: [],
    timestamps: [],
  });

  const maxDataPoints = 100; // Maximum number of data points to display

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const accelerationX = newData.acceleration_x;
      const accelerationY = newData.acceleration_y;
      const accelerationZ = newData.acceleration_z;

      // Convert timestamp to minutes (only minutes part)
      const date = new Date(newData.timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds(); // Use only minutes and seconds

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift(); // Remove excess data if it exceeds maxDataPoints
        }

        return {
          acceleration_x: [...prevData.acceleration_x, accelerationX].slice(-maxDataPoints),
          acceleration_y: [...prevData.acceleration_y, accelerationY].slice(-maxDataPoints),
          acceleration_z: [...prevData.acceleration_z, accelerationZ].slice(-maxDataPoints),
          timestamps: newTimestamps,
        };
      });
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: data.timestamps, // X-axis labels (timestamps in minutes)
    datasets: [
      {
        label: 'Acceleration X',
        data: data.acceleration_x,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: 'origin', // Stack this dataset
        tension: 0.3,
      },
      {
        label: 'Acceleration Y',
        data: data.acceleration_y,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: 'origin',
        tension: 0.3,
      },
      {
        label: 'Acceleration Z',
        data: data.acceleration_z,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: 'origin',
        tension: 0.3,
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
          text: 'Acceleration Value',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ height: '430px', width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Real-Time Acceleration Data</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default AccelerationChart;
