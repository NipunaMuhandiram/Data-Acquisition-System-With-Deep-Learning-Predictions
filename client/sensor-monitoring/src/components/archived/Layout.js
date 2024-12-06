// src/components/Layout.js
import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sensor Dashboard
        </Typography>
        <Grid container spacing={4}>
          {children}
        </Grid>
      </Box>
    </Container>
  );
};

export default Layout;
