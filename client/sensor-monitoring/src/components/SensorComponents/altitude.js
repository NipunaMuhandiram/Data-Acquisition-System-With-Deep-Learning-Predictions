import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AltitudeChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    altitude: [],
    timestamps: [],
  });

  const maxDataPoints = 100;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const altitude = newData.altitude;
      const date = new Date(newData.timestamp);
      const minutes = date.getMinutes() + ':' + date.getSeconds();

      setData((prevData) => {
        const newTimestamps = [...prevData.timestamps, minutes];
        if (newTimestamps.length > maxDataPoints) {
          newTimestamps.shift();
        }

        return {
          altitude: [...prevData.altitude, altitude].slice(-maxDataPoints),
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
        label: 'Altitude (m)',
        data: data.altitude,
        borderColor: 'rgba(0, 123, 255, 1)',
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
          text: 'Altitude (m)',
        },
        ticks: {
          stepSize: 5,
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
    <h2 style={{ textAlign: 'center' }}>Real-Time Altitude Data</h2>
    <Line ref={chartRef} data={chartData} options={options} />
  </div>
  );
};

export default AltitudeChart;
