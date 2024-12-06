// src/components/RealTimeLinePlot.js
import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const RealTimeLinePlot = ({ timeData, sensorData }) => {
  const config = {
    series: [
      { type: 'line', data: sensorData },
    ],
    height: 400,
    xAxis: [
      {
        data: timeData,
        scaleType: 'time',
        valueFormatter: (date) =>
          date.getHours() === 0
            ? date.toLocaleDateString('fr-FR', {
                month: '2-digit',
                day: '2-digit',
              })
            : date.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
              }),
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <ResponsiveChartContainer {...config}>
        <LinePlot />
        <ChartsReferenceLine y={50} label="Middle value" labelAlign="end" />
        <ChartsXAxis />
        <ChartsYAxis />
      </ResponsiveChartContainer>
    </Box>
  );
};

export default RealTimeLinePlot;
