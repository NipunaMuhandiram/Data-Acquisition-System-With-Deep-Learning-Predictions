import React, { useEffect, useState } from 'react';

const DataTable = () => {
  const [data, setData] = useState({
    temperature: null,
    pressure: null,
    lightIntensity: null,
    vibrationLevel: null,
    acceleration_x: null,
    acceleration_y: null,
    acceleration_z: null,
    altitude: null,
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      // Update specific values in the table without refreshing all data
      setData((prevData) => ({
        ...prevData,
        temperature: newData.temperature,
        pressure: newData.pressure,
        lightIntensity: newData.light_intensity,
        vibrationLevel: newData.vibration_level,
        acceleration_x: newData.acceleration_x,
        acceleration_y: newData.acceleration_y,
        acceleration_z: newData.acceleration_z,
        altitude: newData.altitude,
      }));
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#1E3A8A' }}>Real-Time Sensor Data</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStylel}>Sensor</th>
            <th style={headerStyler}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={rowStyle}>Temperature</td>
            <td style={rowStyle}>{data.temperature !== null ? data.temperature : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Pressure</td>
            <td style={rowStyle}>{data.pressure !== null ? data.pressure : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Light Intensity</td>
            <td style={rowStyle}>{data.lightIntensity !== null ? data.lightIntensity : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Vibration Level</td>
            <td style={rowStyle}>{data.vibrationLevel !== null ? data.vibrationLevel : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Acceleration X</td>
            <td style={rowStyle}>{data.acceleration_x !== null ? data.acceleration_x : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Acceleration Y</td>
            <td style={rowStyle}>{data.acceleration_y !== null ? data.acceleration_y : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Acceleration Z</td>
            <td style={rowStyle}>{data.acceleration_z !== null ? data.acceleration_z : 'Loading...'}</td>
          </tr>
          <tr>
            <td style={rowStyle}>Altitude</td>
            <td style={rowStyle}>{data.altitude !== null ? data.altitude : 'Loading...'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: '100%',
  marginTop: '20px',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
  backgroundColor: '#f0f9ff',
  borderRadius: '10px', // Rounded corners for the table
  overflow: 'hidden', // To ensure rounded corners are visible
};

const headerStylel = {
  backgroundColor: '#1E3A8A',  // Dark blue
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  borderTopLeftRadius: '10px', // Rounded top-left corner
  // borderTopRightRadius: '10px', // Rounded top-right corner
};

const headerStyler = {
  backgroundColor: '#1E3A8A',  // Dark blue
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  // borderTopLeftRadius: '10px', // Rounded top-left corner
  borderTopRightRadius: '10px', // Rounded top-right corner
  
};

const rowStyle = {
  padding: '5px',
  textAlign: 'center',
  // borderBottom: '1px solid #ddd',
  backgroundColor: '#ffffff',
  // borderLeft: '1px solid #ddd',
  // borderRight: '1px solid #ddd',
};

export default DataTable;
