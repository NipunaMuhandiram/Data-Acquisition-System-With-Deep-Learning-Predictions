import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    temperature: [],
    timestamps: [],
  });

  const maxDataPoints = 100;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const temperature = newData.temperature;
      const date = new Date(newData.timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds();

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift();
        }

        return {
          temperature: [...prevData.temperature, temperature].slice(-maxDataPoints),
          timestamps: newTimestamps,
        };
      });
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.temperature,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: 'origin',
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
        stacked: true,
        title: {
          display: true,
          text: 'Time (Minutes)',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: { duration: 0 },
  };

  return (
    <div style={{ height: '430px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
    <h2 style={{ textAlign: 'center' }}>Real-Time Temperature Sensor Data</h2>
    <Line ref={chartRef} data={chartData} options={options} />
  </div>
    
  );
};

export default TemperatureChart;
