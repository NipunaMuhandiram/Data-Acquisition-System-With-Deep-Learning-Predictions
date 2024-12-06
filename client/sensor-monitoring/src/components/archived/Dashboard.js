// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

const Dashboard = () => {
  return (
    <Container maxWidth="sm">
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>

                <nav>
                    <ul>
                    <li><Link to="/gas-sensor-1">Gas Sensor 1</Link></li>
                    <li><Link to="/gas-sensor-2">Gas Sensor 2</Link></li>
                    <li><Link to="/light-sensor">Light Sensor</Link></li>
                    <li><Link to="/vibration-sensor">Vibration Sensor</Link></li>
                    <li><Link to="/humidity-pressure-sensor">Humidity & Pressure Sensor</Link></li>
                    <li><Link to="/soil-moisture-sensor">Soil Moisture Sensor</Link></li>
                    </ul>
                </nav>

                <Grid container spacing={2}>
                <Grid size={4}>

             <div>
             <h1>Sensor Dashboard</h1>
            </div>

        </Grid>
      </Grid>
    </Box>
 
    </Container>
  );
};

export default Dashboard;
