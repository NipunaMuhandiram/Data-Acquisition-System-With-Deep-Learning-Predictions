// // src/components/SensorDashboard.js
// import React, { useEffect, useState } from 'react';

// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: null,
//     gasSensor2: null,
//     lightSensor: null,
//     vibrationSensor: null,
//     humidityPressureSensor: null,
//     soilMoistureSensor: null,
//   });

//   useEffect(() => {
//     // Create a WebSocket connection
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     // Event listener when WebSocket connection is opened
//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     // Event listener when a message is received from the WebSocket
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       // Update the sensor data based on the incoming message
//       if (data.sensor_id === 'gas_sensor_1') {
//         setSensorData((prev) => ({ ...prev, gasSensor1: data }));
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         setSensorData((prev) => ({ ...prev, gasSensor2: data }));
//       } else if (data.sensor_id === 'light_sensor') {
//         setSensorData((prev) => ({ ...prev, lightSensor: data }));
//       } else if (data.sensor_id === 'vibration_sensor') {
//         setSensorData((prev) => ({ ...prev, vibrationSensor: data }));
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         setSensorData((prev) => ({ ...prev, humidityPressureSensor: data }));
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         setSensorData((prev) => ({ ...prev, soilMoistureSensor: data }));
//       }
//     };

//     // Event listener when WebSocket connection is closed
//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     // Cleanup the WebSocket connection when the component unmounts
//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Sensor Dashboard</h1>

//       <div>
//         <h2>Gas Sensor 1</h2>
//         {sensorData.gasSensor1 ? (
//           <p>Gas Level: {sensorData.gasSensor1.gas_level} at {sensorData.gasSensor1.timestamp}</p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>

//       <div>
//         <h2>Gas Sensor 2</h2>
//         {sensorData.gasSensor2 ? (
//           <p>Gas Level: {sensorData.gasSensor2.gas_level} at {sensorData.gasSensor2.timestamp}</p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>

//       <div>
//         <h2>Light Sensor</h2>
//         {sensorData.lightSensor ? (
//           <p>Light Intensity: {sensorData.lightSensor.light_intensity} at {sensorData.lightSensor.timestamp}</p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>

//       <div>
//         <h2>Vibration Sensor</h2>
//         {sensorData.vibrationSensor ? (
//           <p>Vibration Level: {sensorData.vibrationSensor.vibration_level} at {sensorData.vibrationSensor.timestamp}</p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>

//       <div>
//         <h2>Humidity & Pressure Sensor</h2>
//         {sensorData.humidityPressureSensor ? (
//           <p>
//             Humidity: {sensorData.humidityPressureSensor.humidity}% | Pressure: {sensorData.humidityPressureSensor.pressure}hPa
//             at {sensorData.humidityPressureSensor.timestamp}
//           </p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>

//       <div>
//         <h2>Soil Moisture Sensor</h2>
//         {sensorData.soilMoistureSensor ? (
//           <p>Moisture Level: {sensorData.soilMoistureSensor.moisture_level} at {sensorData.soilMoistureSensor.timestamp}</p>
//         ) : (
//           <p>No data received</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SensorDashboard;




// REALTIME CHART USING CHATJS V1


// // src/components/SensorDashboard.js
// import React, { useEffect, useState } from 'react';
// import RealTimeChart from './RealTimeChart';

// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: null,
//     gasSensor2: null,
//     lightSensor: null,
//     vibrationSensor: null,
//     humidityPressureSensor: null,
//     soilMoistureSensor: null,
//   });

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       // Update the sensor data based on the incoming message
//       if (data.sensor_id === 'gas_sensor_1') {
//         setSensorData((prev) => ({ ...prev, gasSensor1: data }));
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         setSensorData((prev) => ({ ...prev, gasSensor2: data }));
//       } else if (data.sensor_id === 'light_sensor') {
//         setSensorData((prev) => ({ ...prev, lightSensor: data }));
//       } else if (data.sensor_id === 'vibration_sensor') {
//         setSensorData((prev) => ({ ...prev, vibrationSensor: data }));
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         setSensorData((prev) => ({ ...prev, humidityPressureSensor: data }));
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         setSensorData((prev) => ({ ...prev, soilMoistureSensor: data }));
//       }
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Sensor Dashboard</h1>

//       {/* Render RealTimeChart for each sensor */}
//       {sensorData.gasSensor1 && (
//         <div>
//           <h2>Gas Sensor 1</h2>
//           <RealTimeChart sensorData={sensorData.gasSensor1} sensorId="gas_level" />
//         </div>
//       )}

//       {sensorData.gasSensor2 && (
//         <div>
//           <h2>Gas Sensor 2</h2>
//           <RealTimeChart sensorData={sensorData.gasSensor2} sensorId="gas_level" />
//         </div>
//       )}

//       {sensorData.lightSensor && (
//         <div>
//           <h2>Light Sensor</h2>
//           <RealTimeChart sensorData={sensorData.lightSensor} sensorId="light_intensity" />
//         </div>
//       )}

//       {sensorData.vibrationSensor && (
//         <div>
//           <h2>Vibration Sensor</h2>
//           <RealTimeChart sensorData={sensorData.vibrationSensor} sensorId="vibration_level" />
//         </div>
//       )}

//       {sensorData.humidityPressureSensor && (
//         <div>
//           <h2>Humidity & Pressure Sensor</h2>
//           <RealTimeChart sensorData={sensorData.humidityPressureSensor} sensorId="humidity" />
//         </div>
//       )}

//       {sensorData.soilMoistureSensor && (
//         <div>
//           <h2>Soil Moisture Sensor</h2>
//           <RealTimeChart sensorData={sensorData.soilMoistureSensor} sensorId="moisture_level" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SensorDashboard;







//  chart v2 material ui


// import React, { useEffect, useState } from 'react';
// import GasSensor1 from './SensorComponents/GasSensor1';
// import GasSensor2 from './SensorComponents/GasSensor2';
// import LightSensor from './SensorComponents/LightSensor';
// import VibrationSensor from './SensorComponents/VibrationSensor';
// import HumidityPressureSensor from './SensorComponents/HumidityPressureSensor';
// import SoilMoistureSensor from './SensorComponents/SoilMoistureSensor';



// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//   });

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       // Update the sensor data based on the incoming message
//       const newSensorData = { ...sensorData };

//       if (data.sensor_id === 'gas_sensor_1') {
//         newSensorData.gasSensor1.data.push(data.gas_level);
//         newSensorData.gasSensor1.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         newSensorData.gasSensor2.data.push(data.gas_level);
//         newSensorData.gasSensor2.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'light_sensor') {
//         newSensorData.lightSensor.data.push(data.light_intensity);
//         newSensorData.lightSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'vibration_sensor') {
//         newSensorData.vibrationSensor.data.push(data.vibration_level);
//         newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         newSensorData.humidityPressureSensor.data.push(data.humidity);
//         newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         newSensorData.soilMoistureSensor.data.push(data.moisture_level);
//         newSensorData.soilMoistureSensor.timestamps.push(data.timestamp);
//       }

//       // Keep only the last 20 data points for visualization
//       Object.keys(newSensorData).forEach((key) => {
//         if (newSensorData[key].data.length > 20) {
//           newSensorData[key].data.shift();
//           newSensorData[key].timestamps.shift();
//         }
//       });

//       setSensorData(newSensorData);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, [sensorData]);

//   return (


//             <div>
//               <h1>Sensor Dashboard</h1>

//               <GasSensor1 
//                 data={sensorData.gasSensor1.data} 
//                 timestamps={sensorData.gasSensor1.timestamps} 
//               />

//               <GasSensor2 
//                 data={sensorData.gasSensor2.data} 
//                 timestamps={sensorData.gasSensor2.timestamps} 
//               />

//               <LightSensor 
//                 data={sensorData.lightSensor.data} 
//                 timestamps={sensorData.lightSensor.timestamps} 
//               />

//               <VibrationSensor 
//                 data={sensorData.vibrationSensor.data} 
//                 timestamps={sensorData.vibrationSensor.timestamps} 
//               />

//               <HumidityPressureSensor 
//                 data={sensorData.humidityPressureSensor.data} 
//                 timestamps={sensorData.humidityPressureSensor.timestamps} 
//               />

//               <SoilMoistureSensor 
//                 data={sensorData.soilMoistureSensor.data} 
//                 timestamps={sensorData.soilMoistureSensor.timestamps} 
//               />
//             </div>

  
//   );
// };

// export default SensorDashboard;



// layout



// import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid2';
// import Navigation from './Navigation';
// import GasSensor1 from './SensorComponents/GasSensor1';
// import GasSensor2 from './SensorComponents/GasSensor2';
// import LightSensor from './SensorComponents/LightSensor';
// import VibrationSensor from './SensorComponents/VibrationSensor';
// import HumidityPressureSensor from './SensorComponents/HumidityPressureSensor';
// import SoilMoistureSensor from './SensorComponents/SoilMoistureSensor';

// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//   });

//   const [selectedSensor, setSelectedSensor] = useState('gasSensor1'); // Default selected sensor

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       const newSensorData = { ...sensorData };

//       // Update sensor data based on the incoming message
//       if (data.sensor_id === 'gas_sensor_1') {
//         newSensorData.gasSensor1.data.push(data.gas_level);
//         newSensorData.gasSensor1.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         newSensorData.gasSensor2.data.push(data.gas_level);
//         newSensorData.gasSensor2.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'light_sensor') {
//         newSensorData.lightSensor.data.push(data.light_intensity);
//         newSensorData.lightSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'vibration_sensor') {
//         newSensorData.vibrationSensor.data.push(data.vibration_level);
//         newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         newSensorData.humidityPressureSensor.data.push(data.humidity);
//         newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         newSensorData.soilMoistureSensor.data.push(data.moisture_level);
//         newSensorData.soilMoistureSensor.timestamps.push(data.timestamp);
//       }

//       // Keep only the last 20 data points for visualization
//       Object.keys(newSensorData).forEach((key) => {
//         if (newSensorData[key].data.length > 20) {
//           newSensorData[key].data.shift();
//           newSensorData[key].timestamps.shift();
//         }
//       });

//       setSensorData(newSensorData);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, [sensorData]);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={3}>
//         <Navigation onSelect={setSelectedSensor} />
//       </Grid>
//       <Grid item xs={9}>
//         {selectedSensor === 'gasSensor1' && (
//           <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
//         )}
//         {selectedSensor === 'gasSensor2' && (
//           <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
//         )}
//         {selectedSensor === 'lightSensor' && (
//           <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//         )}
//         {selectedSensor === 'vibrationSensor' && (
//           <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
//         )}
//         {selectedSensor === 'humidityPressureSensor' && (
//           <HumidityPressureSensor data={sensorData.humidityPressureSensor.data} timestamps={sensorData.humidityPressureSensor.timestamps} />
//         )}
//         {selectedSensor === 'soilMoistureSensor' && (
//           <SoilMoistureSensor data={sensorData.soilMoistureSensor.data} timestamps={sensorData.soilMoistureSensor.timestamps} />
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default SensorDashboard;


//  csss 

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navigation from './Navigation';
import GasSensor1 from './SensorComponents/gyro';
import GasSensor2 from './SensorComponents/temp';
import LightSensor from './SensorComponents/LightSensor';
import VibrationSensor from './SensorComponents/VibrationSensor';
import HumidityPressureSensor from './SensorComponents/pressure';
import SoilMoistureSensor from './SensorComponents/SoilMoistureSensor';
import Home from './SensorComponents/Home';
import DataTable from './SensorComponents/DataTable';
import Pridict from './SensorComponents/Pridict';

import './SensorDashboard.css'; // Import CSS for custom styles
import Device from './components/LightSensor1';
import GasSensorChart from './SensorComponents/gyro';
import TemperatureChart from './SensorComponents/temp';
import LightIntensityChart from './SensorComponents/LightSensor';
import PressureChart from './SensorComponents/pressure';
import VibrationLevelChart from './SensorComponents/VibrationSensor';
import AccelerationChart from './SensorComponents/AccelerationSensor';
import AltitudeChart from './SensorComponents/altitude';


// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//   });

//   const [selectedSensor, setSelectedSensor] = useState('gasSensor1');

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       const newSensorData = { ...sensorData };

//       if (data.sensor_id === 'gas_sensor_1') {
//         newSensorData.gasSensor1.data.push(data.gas_level);
//         newSensorData.gasSensor1.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'gas_sensor_2') {
//         newSensorData.gasSensor2.data.push(data.gas_level);
//         newSensorData.gasSensor2.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'light_sensor') {
//         newSensorData.lightSensor.data.push(data.light_intensity);
//         newSensorData.lightSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'vibration_sensor') {
//         newSensorData.vibrationSensor.data.push(data.vibration_level);
//         newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'humidity_pressure_sensor') {
//         newSensorData.humidityPressureSensor.data.push(data.humidity);
//         newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//       } else if (data.sensor_id === 'soil_moisture_sensor') {
//         newSensorData.soilMoistureSensor.data.push(data.moisture_level);
//         newSensorData.soilMoistureSensor.timestamps.push(data.timestamp);
//       }

//       Object.keys(newSensorData).forEach((key) => {
//         if (newSensorData[key].data.length > 10) {
//           newSensorData[key].data.shift();
//           newSensorData[key].timestamps.shift();
//         }
//       });

//       setSensorData(newSensorData);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, [sensorData]);

//   return (
//     <Grid container className="dashboard-container">
//       {/* Navigation Panel */}
//       <Grid item xs={2} className="navigation-container">
//         <Navigation onSelect={setSelectedSensor} />
//       </Grid>

//       {/* Main Content Area */}
//       <Grid item xs={20} className="chart-container">
//         <Card className="sensor-card">
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               {/* {selectedSensor === 'gasSensor1' && 'Gas Sensor 1'} */}
//               {/* {selectedSensor === 'gasSensor2' && 'Gas Sensor 2'} */}
//               {/* {selectedSensor === 'lightSensor' && 'Light Sensor'} */}
//               {/* {selectedSensor === 'vibrationSensor' && 'Vibration Sensor'} */}
//               {/* {selectedSensor === 'humidityPressureSensor' && 'Humidity & Pressure Sensor'} */}
//               {/* {selectedSensor === 'soilMoistureSensor' && 'Soil Moisture Sensor'} */}
//               {/* {selectedSensor === 'Home' && 'home'} */}
//             </Typography>

//             {/* Render Selected Sensor Data */}
//             {selectedSensor === 'gasSensor1' && (
//               <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
//             )}
//             {selectedSensor === 'gasSensor2' && (
//               <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
//             )}
//             {selectedSensor === 'lightSensor' && (
//               <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}
//             {selectedSensor === 'vibrationSensor' && (
//               <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
//             )}
//             {selectedSensor === 'humidityPressureSensor' && (
//               <HumidityPressureSensor
//                 data={sensorData.humidityPressureSensor.data}
//                 timestamps={sensorData.humidityPressureSensor.timestamps}
//               />
//             )}
//             {selectedSensor === 'soilMoistureSensor' && (
//               <SoilMoistureSensor
//                 data={sensorData.soilMoistureSensor.data}
//                 timestamps={sensorData.soilMoistureSensor.timestamps}
//               />
//             )}

//             {selectedSensor === 'Home' && (
//               <Home sensorData={sensorData} />                        
//             )}

//             {selectedSensor === 'Data' && (
//               <DataTable sensorData={sensorData} />                        
//             )}

//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default SensorDashboard;






// import React, { useEffect, useState } from 'react';
// import { Grid, Card, CardContent, Typography } from '@material-ui/core';
// import GasSensor1 from './GasSensor1';  // Make sure you import your sensor components
// import GasSensor2 from './GasSensor2';
// import LightSensor from './LightSensor';
// import VibrationSensor from './VibrationSensor';
// import HumidityPressureSensor from './HumidityPressureSensor';
// import SoilMoistureSensor from './SoilMoistureSensor';
// import Navigation from './Navigation';  // Import Navigation component
// import Home from './Home';  // Import Home component
// import DataTable from './DataTable';  // Import DataTable component

// const SensorDashboard = () => {
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//     pridictionData: { raw: [],prdt: [], data: [], timestamps: [] },
//   });

//   const [selectedSensor, setSelectedSensor] = useState('gasSensor1');

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       setSensorData((prevSensorData) => {
//         const newSensorData = { ...prevSensorData };

//         // Ensure the IDs match exactly what your backend sends
//         if (data.sensor_id === 'gas_sensor_1') {
//           newSensorData.gasSensor1.data.push(data.gas_level);
//           newSensorData.gasSensor1.timestamps.push(data.timestamp);
//         } else if (data.sensor_id === 'gas_sensor_2') {
//           newSensorData.gasSensor2.data.push(data.gas_level);
//           newSensorData.gasSensor2.timestamps.push(data.timestamp);
//         } else if (data.sensor_id === 'light_sensor') {
//           newSensorData.lightSensor.data.push(data.light_intensity);
//           newSensorData.lightSensor.timestamps.push(data.timestamp);
//         } else if (data.sensor_id === 'vibration_sensor') {
//           newSensorData.vibrationSensor.data.push(data.vibration_level);
//           newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//         } else if (data.sensor_id === 'humidity_pressure_sensor') {
//           newSensorData.humidityPressureSensor.data.push(data.humidity);
//           newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//         } else if (data.sensor_id === 'soil_moisture_sensor') {
//           newSensorData.soilMoistureSensor.data.push(data.moisture_level);
//           newSensorData.soilMoistureSensor.timestamps.push(data.timestamp);
//         }
//         else if (data.sensor_id === 'forecast') {
//           newSensorData.pridictionData.raw.push(data.raw);
//           newSensorData.pridictionData.prdt.push(data.pridict);
//           newSensorData.pridictionData.timestamps.push(data.timestamp);
//         }

//         // Limit to last 10 entries
//         Object.keys(newSensorData).forEach((key) => {
//           if (newSensorData[key].data.length > 10) {
//             newSensorData[key].data.shift();
//             newSensorData[key].timestamps.shift();
//           }
//         });

//         return newSensorData;
//       });
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []); // Removed sensorData from dependencies

//   return (
//     <Grid container className="dashboard-container">
//       {/* Navigation Panel */}
//       <Grid item xs={2} className="navigation-container">
//         <Navigation onSelect={setSelectedSensor} />
//       </Grid>

//       {/* Main Content Area */}
//       <Grid item xs={10} className="chart-container">
//         <Card className="sensor-card">
//           <CardContent>
//             {/* <Typography variant="h5" gutterBottom>
//               {selectedSensor === 'gasSensor1' && 'Gas Sensor 1'}
//               {selectedSensor === 'gasSensor2' && 'Gas Sensor 2'}
//               {selectedSensor === 'lightSensor' && 'Light Sensor'}
//               {selectedSensor === 'vibrationSensor' && 'Vibration Sensor'}
//               {selectedSensor === 'humidityPressureSensor' && 'Humidity & Pressure Sensor'}
//               {selectedSensor === 'soilMoistureSensor' && 'Soil Moisture Sensor'}
//               {selectedSensor === 'Home' && 'Home'}
//               {selectedSensor === 'Data' && 'Data'}
//             </Typography> */}

//             {/* Render Selected Sensor Data */}
//             {selectedSensor === 'gasSensor1' && (
//               <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
//             )}
//             {selectedSensor === 'gasSensor2' && (
//               <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
//             )}
//             {selectedSensor === 'lightSensor' && (
//               <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}
//             {selectedSensor === 'vibrationSensor' && (
//               <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
//             )}
//             {selectedSensor === 'humidityPressureSensor' && (
//               <HumidityPressureSensor
//                 data={sensorData.humidityPressureSensor.data}
//                 timestamps={sensorData.humidityPressureSensor.timestamps}
//               />
//             )}
//             {selectedSensor === 'soilMoistureSensor' && (
//               <SoilMoistureSensor
//                 data={sensorData.soilMoistureSensor.data}
//                 timestamps={sensorData.soilMoistureSensor.timestamps}
//               />
//             )}

//             {selectedSensor === 'Home' && (
//               <Home sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Device' && (
//              <Device data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}

//             {selectedSensor === 'Data' && (
//               <DataTable sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Pridictions' && (
//               <Pridict sensorData={sensorData} />
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default SensorDashboard;


// const SensorDashboard = () => {
//   // Define thresholds for each sensor
//   const THRESHOLDS = {
//     gasSensor1: 50,      // Gas sensor 1 threshold
//     gasSensor2: 40,      // Gas sensor 2 threshold (temperature)
//     lightSensor: 70,     // Light intensity threshold
//     vibrationSensor: 5,  // Vibration level threshold
//     humidityPressureSensor: 60, // Humidity threshold
//   };

//   // State for sensor data and light control
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//     pridictionData: { raw: [], prdt: [], data: [], timestamps: [] },
//   });

//   // State to track which pins/lights are activated
//   const [activatedPins, setActivatedPins] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });

//   const [selectedSensor, setSelectedSensor] = useState('gasSensor1');

//   // Function to send serial command
//   const sendSerialCommand = async (pin, activate) => {
//     const command = activate ? `ACTIVATE_${pin}` : `DEACTIVATE_${pin}`;
//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`);
//       const data = await response.json();
//       console.log(data.message);
      
//       // Update activated pins state
//       setActivatedPins(prev => ({
//         ...prev,
//         [pin]: activate
//       }));
//     } catch (error) {
//       console.error('Error sending command:', error);
//     }
//   };

//   // Check thresholds and control lights
//   const checkThresholdsAndControlLights = (sensorType, latestValue) => {
//     // Define light activation logic based on sensor thresholds
//     switch(sensorType) {
//       case 'gasSensor1':
//         if (latestValue > THRESHOLDS.gasSensor1) {
//           sendSerialCommand('PD3', true);
//         } else {
//           sendSerialCommand('PD3', false);
//         }
//         break;
//       case 'gasSensor2':
//         if (latestValue > THRESHOLDS.gasSensor2) {
//           sendSerialCommand('PD4', true);
//         } else {
//           sendSerialCommand('PD4', false);
//         }
//         break;
//       case 'lightSensor':
//         if (latestValue > THRESHOLDS.lightSensor) {
//           sendSerialCommand('PD5', true);
//         } else {
//           sendSerialCommand('PD5', false);
//         }
//         break;
//       case 'vibrationSensor':
//         if (latestValue > THRESHOLDS.vibrationSensor) {
//           sendSerialCommand('PD6', true);
//         } else {
//           sendSerialCommand('PD6', false);
//         }
//         break;
//       case 'humidityPressureSensor':
//         if (latestValue > THRESHOLDS.humidityPressureSensor) {
//           sendSerialCommand('PD7', true);
//         } else {
//           sendSerialCommand('PD7', false);
//         }
//         break;
//     }
//   };

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data from WebSocket:', data);

//       setSensorData((prevSensorData) => {
//         const newSensorData = { ...prevSensorData };

//         // Process and store sensor data
//         if (data.sensor_id === 'gas_sensor_1') {
//           newSensorData.gasSensor1.data.push(data.gas_level);
//           newSensorData.gasSensor1.timestamps.push(data.timestamp);
//           // Check threshold for gas sensor 1
//           checkThresholdsAndControlLights('gasSensor1', parseFloat(data.gas_level));
//         } else if (data.sensor_id === 'gas_sensor_2') {
//           newSensorData.gasSensor2.data.push(data.gas_level);
//           newSensorData.gasSensor2.timestamps.push(data.timestamp);
//           // Check threshold for gas sensor 2 (temperature)
//           checkThresholdsAndControlLights('gasSensor2', parseFloat(data.gas_level));
//         } else if (data.sensor_id === 'light_sensor') {
//           newSensorData.lightSensor.data.push(data.light_intensity);
//           newSensorData.lightSensor.timestamps.push(data.timestamp);
//           // Check threshold for light sensor
//           checkThresholdsAndControlLights('lightSensor', parseFloat(data.light_intensity));
//         } else if (data.sensor_id === 'vibration_sensor') {
//           newSensorData.vibrationSensor.data.push(data.vibration_level);
//           newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//           // Check threshold for vibration sensor
//           checkThresholdsAndControlLights('vibrationSensor', parseFloat(data.vibration_level));
//         } else if (data.sensor_id === 'humidity_pressure_sensor') {
//           newSensorData.humidityPressureSensor.data.push(data.humidity);
//           newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//           // Check threshold for humidity sensor
//           checkThresholdsAndControlLights('humidityPressureSensor', parseFloat(data.humidity));
//         }

//         // Limit to last 10 entries
//         Object.keys(newSensorData).forEach((key) => {
//           if (newSensorData[key].data && newSensorData[key].data.length > 10) {
//             newSensorData[key].data.shift();
//             newSensorData[key].timestamps.shift();
//           }
//         });

//         return newSensorData;
//       });
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);
//   return (
//     <Grid container className="dashboard-container">
//       {/* Navigation Panel */}
//       <Grid item xs={2} className="navigation-container">
//         <Navigation onSelect={setSelectedSensor} />
//       </Grid>

//       {/* Main Content Area */}
//       <Grid item xs={10} className="chart-container">
//         <Card className="sensor-card">
//           <CardContent>
//             {/* <Typography variant="h5" gutterBottom>
//               {selectedSensor === 'gasSensor1' && 'Gas Sensor 1'}
//               {selectedSensor === 'gasSensor2' && 'Gas Sensor 2'}
//               {selectedSensor === 'lightSensor' && 'Light Sensor'}
//               {selectedSensor === 'vibrationSensor' && 'Vibration Sensor'}
//               {selectedSensor === 'humidityPressureSensor' && 'Humidity & Pressure Sensor'}
//               {selectedSensor === 'soilMoistureSensor' && 'Soil Moisture Sensor'}
//               {selectedSensor === 'Home' && 'Home'}
//               {selectedSensor === 'Data' && 'Data'}
//             </Typography> */}

//             {/* Render Selected Sensor Data */}
//             {selectedSensor === 'gasSensor1' && (
//               <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
//             )}
//             {selectedSensor === 'gasSensor2' && (
//               <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
//             )}
//             {selectedSensor === 'lightSensor' && (
//               <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}
//             {selectedSensor === 'vibrationSensor' && (
//               <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
//             )}
//             {selectedSensor === 'humidityPressureSensor' && (
//               <HumidityPressureSensor
//                 data={sensorData.humidityPressureSensor.data}
//                 timestamps={sensorData.humidityPressureSensor.timestamps}
//               />
//             )}
//             {selectedSensor === 'soilMoistureSensor' && (
//               <SoilMoistureSensor
//                 data={sensorData.soilMoistureSensor.data}
//                 timestamps={sensorData.soilMoistureSensor.timestamps}
//               />
//             )}

//             {selectedSensor === 'Home' && (
//               <Home sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Device' && (
//              <Device data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}

//             {selectedSensor === 'Data' && (
//               <DataTable sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Pridictions' && (
//               <Pridict sensorData={sensorData} />
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default SensorDashboard;











// const SensorDashboard = () => {
//   // State for thresholds
//   const [THRESHOLDS, setTHRESHOLDS] = useState({
//     gasSensor1: 50,
//     gasSensor2: 40,
//     lightSensor: 70,
//     vibrationSensor: 5,
//     humidityPressureSensor: 60,
//   });

//   // State for sensor data and light control
//   const [sensorData, setSensorData] = useState({
//     gasSensor1: { data: [], timestamps: [] },
//     gasSensor2: { data: [], timestamps: [] },
//     lightSensor: { data: [], timestamps: [] },
//     vibrationSensor: { data: [], timestamps: [] },
//     humidityPressureSensor: { data: [], timestamps: [] },
//     soilMoistureSensor: { data: [], timestamps: [] },
//     pridictionData: { raw: [], prdt: [], data: [], timestamps: [] },
//   });

//   // State to track which pins/lights are activated
//   const [activatedPins, setActivatedPins] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });

//   const [selectedSensor, setSelectedSensor] = useState('gasSensor1');

//   // Fetch thresholds from API
//   useEffect(() => {
//     const fetchThresholds = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/get_thresholds/');
//         const data = await response.json();
//         console.log(data)
//         // Transform the API response to match our state structure
//         const transformedThresholds = {
//           gasSensor1: data.thresholds.gas_sensor_1,
//           gasSensor2: data.thresholds.gas_sensor_2,
//           lightSensor: data.thresholds.light_sensor,
//           vibrationSensor: data.thresholds.vibration_sensor,
//           humidityPressureSensor: data.thresholds.humidity_pressure_sensor,
//         };

//         setTHRESHOLDS(transformedThresholds);
//       } catch (error) {
//         console.error('Error fetching thresholds:', error);
//         // Optionally, you could set a default or show an error message
//       }
//     };

//     fetchThresholds();
//   }, []);

//   // Function to send serial command
//   const sendSerialCommand = async (pin, activate) => {
//     const command = activate ? `ACTIVATE_${pin}` : `DEACTIVATE_${pin}`;
//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`);
//       const data = await response.json();
//       console.log(data.message);
      
//       // Update activated pins state
//       setActivatedPins(prev => ({
//         ...prev,
//         [pin]: activate
//       }));
//     } catch (error) {
//       console.error('Error sending command:', error);
//     }
//   };

//   // Check thresholds and control lights
//   const checkThresholdsAndControlLights = (sensorType, latestValue) => {
//     // Define light activation logic based on sensor thresholds
//     switch(sensorType) {
//       case 'gasSensor1':
//         if (latestValue > THRESHOLDS.gasSensor1) {
//           sendSerialCommand('PD3', true);
//         } else {
//           sendSerialCommand('PD3', false);
//         }
//         break;
//       case 'gasSensor2':
//         if (latestValue > THRESHOLDS.gasSensor2) {
//           sendSerialCommand('PD4', true);
//         } else {
//           sendSerialCommand('PD4', false);
//         }
//         break;
//       case 'lightSensor':
//         if (latestValue > THRESHOLDS.lightSensor) {
//           sendSerialCommand('PD5', true);
//         } else {
//           sendSerialCommand('PD5', false);
//         }
//         break;
//       case 'vibrationSensor':
//         if (latestValue > THRESHOLDS.vibrationSensor) {
//           sendSerialCommand('PD6', true);
//         } else {
//           sendSerialCommand('PD6', false);
//         }
//         break;
//       case 'humidityPressureSensor':
//         if (latestValue > THRESHOLDS.humidityPressureSensor) {
//           sendSerialCommand('PD7', true);
//         } else {
//           sendSerialCommand('PD7', false);
//         }
//         break;
//     }
//   };

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');

//     socket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       // console.log('Received data from WebSocket:', data);

//       setSensorData((prevSensorData) => {
//         const newSensorData = { ...prevSensorData };

//         // Process and store sensor data
//         if (data.sensor_id === 'gas_sensor_1') {
//           newSensorData.gasSensor1.data.push(data.gas_level);
//           newSensorData.gasSensor1.timestamps.push(data.timestamp);
//           // Check threshold for gas sensor 1
//           checkThresholdsAndControlLights('gasSensor1', parseFloat(data.gas_level));
//         } else if (data.sensor_id === 'gas_sensor_2') {
//           newSensorData.gasSensor2.data.push(data.gas_level);
//           newSensorData.gasSensor2.timestamps.push(data.timestamp);
//           // Check threshold for gas sensor 2 (temperature)
//           checkThresholdsAndControlLights('gasSensor2', parseFloat(data.gas_level));
//         } else if (data.sensor_id === 'light_sensor') {
//           newSensorData.lightSensor.data.push(data.light_intensity);
//           newSensorData.lightSensor.timestamps.push(data.timestamp);
//           // Check threshold for light sensor
//           checkThresholdsAndControlLights('lightSensor', parseFloat(data.light_intensity));
//         } else if (data.sensor_id === 'vibration_sensor') {
//           newSensorData.vibrationSensor.data.push(data.vibration_level);
//           newSensorData.vibrationSensor.timestamps.push(data.timestamp);
//           // Check threshold for vibration sensor
//           checkThresholdsAndControlLights('vibrationSensor', parseFloat(data.vibration_level));
//         } else if (data.sensor_id === 'humidity_pressure_sensor') {
//           newSensorData.humidityPressureSensor.data.push(data.humidity);
//           newSensorData.humidityPressureSensor.timestamps.push(data.timestamp);
//           // Check threshold for humidity sensor
//           checkThresholdsAndControlLights('humidityPressureSensor', parseFloat(data.humidity));
//         }

//         // Limit to last 10 entries
//         Object.keys(newSensorData).forEach((key) => {
//           if (newSensorData[key].data && newSensorData[key].data.length > 10) {
//             newSensorData[key].data.shift();
//             newSensorData[key].timestamps.shift();
//           }
//         });

//         return newSensorData;
//       });
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <Grid container className="dashboard-container">
//       {/* Navigation Panel */}
//       <Grid item xs={2} className="navigation-container">
//         <Navigation onSelect={setSelectedSensor} />
//       </Grid>

//       {/* Main Content Area */}
//       <Grid item xs={10} className="chart-container">
//         <Card className="sensor-card">
//           <CardContent>
//             {/* Render Selected Sensor Data */}
//             {selectedSensor === 'gasSensor1' && (
//               <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
//             )}
//             {selectedSensor === 'gasSensor2' && (
//               <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
//             )}
//             {selectedSensor === 'lightSensor' && (
//               <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}
//             {selectedSensor === 'vibrationSensor' && (
//               <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
//             )}
//             {selectedSensor === 'humidityPressureSensor' && (
//               <HumidityPressureSensor
//                 data={sensorData.humidityPressureSensor.data}
//                 timestamps={sensorData.humidityPressureSensor.timestamps}
//               />
//             )}
//             {selectedSensor === 'soilMoistureSensor' && (
//               <SoilMoistureSensor
//                 data={sensorData.soilMoistureSensor.data}
//                 timestamps={sensorData.soilMoistureSensor.timestamps}
//               />
//             )}

//             {selectedSensor === 'Home' && (
//               <Home sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Device' && (
//              <Device data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
//             )}

//             {selectedSensor === 'Data' && (
//               <DataTable sensorData={sensorData} />
//             )}

//             {selectedSensor === 'Pridictions' && (
//               <Pridict sensorData={sensorData} />
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default SensorDashboard;










const SensorDashboard = () => {
  // State for thresholds
  const [THRESHOLDS, setTHRESHOLDS] = useState({
    gasSensor1: 50,
    gasSensor2: 40,
    lightSensor: 70,
    vibrationSensor: 5,
    humidityPressureSensor: 60,
  });

  // State for sensor data and light control
  const [sensorData, setSensorData] = useState({
    gasSensor1: { data: [], timestamps: [] },
    gasSensor2: { data: [], timestamps: [] },
    lightSensor: { data: [], timestamps: [] },
    vibrationSensor: { data: [], timestamps: [] },
    humidityPressureSensor: { data: [], timestamps: [] },
    soilMoistureSensor: { data: [], timestamps: [] },
    pridictionData: { raw: [], prdt: [], data: [], timestamps: [] },
  });

  // State to track which pins/lights are activated
  const [activatedPins, setActivatedPins] = useState({
    PD3: false,
    PD4: false,
    PD5: false,
    PD6: false,
    PD7: false,
  });

  const [selectedSensor, setSelectedSensor] = useState('gasSensor1');

  // Fetch thresholds from API
  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        const response = await fetch('http://localhost:8000/serial/get_thresholds/');
        const data = await response.json();
        console.log(data)
        // Transform the API response to match our state structure
        const transformedThresholds = {
          gasSensor1: data.thresholds.gas_sensor_1,
          gasSensor2: data.thresholds.gas_sensor_2,
          lightSensor: data.thresholds.light_sensor,
          vibrationSensor: data.thresholds.vibration_sensor,
          humidityPressureSensor: data.thresholds.humidity_pressure_sensor,
        };

        setTHRESHOLDS(transformedThresholds);
      } catch (error) {
        console.error('Error fetching thresholds:', error);
        // Optionally, you could set a default or show an error message
      }
    };

    fetchThresholds();
  }, []);

  // Function to send serial command
  const sendSerialCommand = async (pin, activate) => {
    const command = activate ? `ACTIVATE_${pin}` : `DEACTIVATE_${pin}`;
    try {
      const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`);
      const data = await response.json();
      console.log(data.message);
      
      // Update activated pins state
      setActivatedPins(prev => ({
        ...prev,
        [pin]: activate
      }));
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  // Check thresholds and control lights
  const checkThresholdsAndControlLights = (sensorType, latestValue) => {
    // Define light activation logic based on sensor thresholds
    switch(sensorType) {
      case 'gasSensor1':
        if (latestValue > THRESHOLDS.gasSensor1) {
          sendSerialCommand('PD3', true);
        } else {
          sendSerialCommand('PD3', false);
        }
        break;
      case 'gasSensor2':
        if (latestValue > THRESHOLDS.gasSensor2) {
          sendSerialCommand('PD4', true);
        } else {
          sendSerialCommand('PD4', false);
        }
        break;
      case 'lightSensor':
        if (latestValue > THRESHOLDS.lightSensor) {
          sendSerialCommand('PD5', true);
        } else {
          sendSerialCommand('PD5', false);
        }
        break;
      case 'vibrationSensor':
        if (latestValue > THRESHOLDS.vibrationSensor) {
          sendSerialCommand('PD6', true);
        } else {
          sendSerialCommand('PD6', false);
        }
        break;
      case 'humidityPressureSensor':
        if (latestValue > THRESHOLDS.humidityPressureSensor) {
          sendSerialCommand('PD7', true);
        } else {
          sendSerialCommand('PD7', false);
        }
        break;
    }
  };

 

  return (
    <Grid container className="dashboard-container">
      {/* Navigation Panel */}
      <Grid item xs={2} className="navigation-container">
        <Navigation onSelect={setSelectedSensor} />
      </Grid>

      {/* Main Content Area */}
      <Grid item xs={10} className="chart-container">
        <Card className="sensor-card">
          <CardContent>
            
            {selectedSensor === 'gyro' && (
              <GasSensorChart/>
              // <GasSensor1 data={sensorData.gasSensor1.data} timestamps={sensorData.gasSensor1.timestamps} />
            )}
            {selectedSensor === 'temp' && (
              <TemperatureChart/>
              // <GasSensor2 data={sensorData.gasSensor2.data} timestamps={sensorData.gasSensor2.timestamps} />
            )}
            {selectedSensor === 'lightSensor' && (
              <LightIntensityChart/>
              // <LightSensor data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
            )}
            {selectedSensor === 'vibrationSensor' && (
              <VibrationLevelChart/>
              // <VibrationSensor data={sensorData.vibrationSensor.data} timestamps={sensorData.vibrationSensor.timestamps} />
            )}
            {selectedSensor === 'pressure' && (
              <PressureChart/>
              // <HumidityPressureSensor
              //   data={sensorData.humidityPressureSensor.data}
              //   timestamps={sensorData.humidityPressureSensor.timestamps}
              // />
            )}
            {selectedSensor === 'AccelerationSensor' && (
            <AccelerationChart/>
            )}
            {selectedSensor === 'altitude' && (
            <AltitudeChart/>
            )}

            {selectedSensor === 'Home' && (
              <Home sensorData={sensorData} />
            )}

            {selectedSensor === 'Device' && (
             <Device data={sensorData.lightSensor.data} timestamps={sensorData.lightSensor.timestamps} />
            )}

            {selectedSensor === 'DataTable' && (
          <DataTable/>
            )}

            {selectedSensor === 'Pridictions' && (
              <Pridict sensorData={sensorData} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SensorDashboard;