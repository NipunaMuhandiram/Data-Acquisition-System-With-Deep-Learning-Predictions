// src/components/SensorSparklineChart.js
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const SensorSparklineChart = ({ sensorData, sensorId }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (sensorData) {
      // Update the Sparkline data with the new value
      setData((prevData) => {
        const newData = [
          ...prevData,
          { time: new Date(sensorData.timestamp).toLocaleTimeString(), value: sensorData[sensorId] },
        ];

        // Limit the number of data points (e.g., last 10 points)
        if (newData.length > 10) {
          newData.shift();
        }

        return newData;
      });
    }
  }, [sensorData, sensorId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>{sensorId.replace(/_/g, ' ').toUpperCase()}</Typography>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="blue" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SensorSparklineChart;

