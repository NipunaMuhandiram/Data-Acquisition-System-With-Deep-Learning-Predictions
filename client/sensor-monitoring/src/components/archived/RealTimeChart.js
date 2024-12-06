// src/components/RealTimeChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const RealTimeChart = ({ sensorData, sensorId }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: sensorId,
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (sensorData) {
      // Update the data array
      setData((prevData) => {
        const newLabels = [...prevData.labels, new Date(sensorData.timestamp).toLocaleTimeString()];
        const newData = [...prevData.datasets[0].data, sensorData[sensorId]];

        // Limit the number of points shown on the chart (e.g., last 20 points)
        if (newLabels.length > 20) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }
  }, [sensorData, sensorId]);

  return (
    <div>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default RealTimeChart;






