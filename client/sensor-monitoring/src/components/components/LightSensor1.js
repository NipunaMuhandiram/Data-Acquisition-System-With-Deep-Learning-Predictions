// import React, { useEffect, useState } from 'react';

// const Device = () => {
//   const [ports, setPorts] = useState([]);
//   const [selectedPort, setSelectedPort] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [currentActivePort, setCurrentActivePort] = useState(null);
//   const [pinStates, setPinStates] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });

//   useEffect(() => {
//     const fetchPorts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/available-ports/');
//         const data = await response.json();
//         setPorts(data.available_ports);
//       } catch (error) {
//         console.error('Error fetching COM ports:', error);
//         setFeedback('Failed to fetch COM ports.');
//       }
//     };

//     const checkCurrentPort = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/current_port/');
//         const data = await response.json();
        
//         if (data.status === 'active') {
//           setSelectedPort(data.current_port);
//           setCurrentActivePort(data.current_port);
//           setFeedback(`Currently active port: ${data.current_port}`);
//         }
//       } catch (error) {
//         console.error('Error checking current port:', error);
//       }
//     };

//     fetchPorts();
//     checkCurrentPort();

//     // Optional: Set up periodic checks for the current port
//     const portCheckInterval = setInterval(checkCurrentPort, 5000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(portCheckInterval);
//   }, []);

//   const handlePortChange = async (event) => {
//     const port = event.target.value;
//     setSelectedPort(port);

//     if (port) {
//       try {
//         const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
//           method: 'GET',
//         });
//         const data = await response.json();
        
//         // Verify the current port after starting listening
//         const currentPortResponse = await fetch('http://localhost:8000/serial/current_port/');
//         const currentPortData = await currentPortResponse.json();
        
//         if (currentPortData.status === 'active') {
//           setCurrentActivePort(currentPortData.current_port);
//         }

//         setFeedback(data.message || 'Started listening successfully.');
//       } catch (error) {
//         console.error('Error starting listener:', error);
//         setFeedback('Error starting listener.');
//       }
//     }
//   };

//   const handleCommandSend = async (pin) => {
//     const currentState = pinStates[pin];
//     const command = currentState ? `DEACTIVATE_${pin}` : `ACTIVATE_${pin}`;

//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       setFeedback(data.message || `${command} sent successfully.`);

//       // Toggle the pin state after successful command
//       if (response.ok) {
//         setPinStates((prevStates) => ({
//           ...prevStates,
//           [pin]: !currentState,
//         }));
//       }
//     } catch (error) {
//       console.error('Error sending command:', error);
//       setFeedback('Error sending command.');
//     }
//   };

//   const pins = ['PD3', 'PD4', 'PD5', 'PD6', 'PD7'];

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">List of Communication Ports</h2>

//       <select
//         value={selectedPort}
//         onChange={handlePortChange}
//         className="w-full p-2 border rounded mb-4"
//       >
//         <option value="">Select Port</option>
//         {ports.map((port) => (
//           <option key={port} value={port}>
//             {port}
//           </option>
//         ))}
//       </select>

//       {currentActivePort && (
//         <p className="text-sm text-gray-600 mb-4">
//           Active Port: {currentActivePort}
//         </p>
//       )}

//       <h3 className="text-lg font-semibold mb-4">Device Commands</h3>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//         {pins.map((pin) => (
//           <button
//             key={pin}
//             onClick={() => handleCommandSend(pin)}
//             disabled={!selectedPort}
//             className={`
//               px-4 py-2 rounded transition-colors 
//               ${!selectedPort ? 'bg-gray-300 cursor-not-allowed' : 
//                 pinStates[pin] 
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }
//             `}
//           >
//             {pinStates[pin] ? `Deactivate ${pin}` : `Activate ${pin}`}
//           </button>
//         ))}
//       </div>

//       {feedback && (
//         <p className="mt-4 text-sm text-gray-600">
//           {feedback}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Device;







// import React, { useEffect, useState } from 'react';

// const Device = () => {
//   const [ports, setPorts] = useState([]);
//   const [selectedPort, setSelectedPort] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [currentActivePort, setCurrentActivePort] = useState(null);
//   const [pinStates, setPinStates] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });

//   // Updated threshold values with new sensors
//   const [thresholdValues, setThresholdValues] = useState({
//     gas_sensor_1: 1023,
//     gas_sensor_2: 1023,
//     light_sensor: 1023,
//     vibration_sensor: 500,
//     humidity_pressure_sensor: 60
//   });

//   useEffect(() => {
//     const fetchPorts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/available-ports/');
//         const data = await response.json();
//         setPorts(data.available_ports);
//       } catch (error) {
//         console.error('Error fetching COM ports:', error);
//         setFeedback('Failed to fetch COM ports.');
//       }
//     };

//     const checkCurrentPort = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/current_port/');
//         const data = await response.json();
        
//         if (data.status === 'active') {
//           setSelectedPort(data.current_port);
//           setCurrentActivePort(data.current_port);
//           setFeedback(`Currently active port: ${data.current_port}`);
//         }
//       } catch (error) {
//         console.error('Error checking current port:', error);
//       }
//     };

//     fetchPorts();
//     checkCurrentPort();

//     const portCheckInterval = setInterval(checkCurrentPort, 5000);

//     return () => clearInterval(portCheckInterval);
//   }, []);

//   const handlePortChange = async (event) => {
//     const port = event.target.value;
//     setSelectedPort(port);

//     if (port) {
//       try {
//         const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
//           method: 'GET',
//         });
//         const data = await response.json();
        
//         const currentPortResponse = await fetch('http://localhost:8000/serial/current_port/');
//         const currentPortData = await currentPortResponse.json();
        
//         if (currentPortData.status === 'active') {
//           setCurrentActivePort(currentPortData.current_port);
//         }

//         setFeedback(data.message || 'Started listening successfully.');
//       } catch (error) {
//         console.error('Error starting listener:', error);
//         setFeedback('Error starting listener.');
//       }
//     }
//   };

//   const handleCommandSend = async (pin) => {
//     const currentState = pinStates[pin];
//     const command = currentState ? `DEACTIVATE_${pin}` : `ACTIVATE_${pin}`;

//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       setFeedback(data.message || `${command} sent successfully.`);

//       if (response.ok) {
//         setPinStates((prevStates) => ({
//           ...prevStates,
//           [pin]: !currentState,
//         }));
//       }
//     } catch (error) {
//       console.error('Error sending command:', error);
//       setFeedback('Error sending command.');
//     }
//   };

//   // Updated to handle new sensor thresholds
//   const handleThresholdChange = (sensor, value) => {
//     setThresholdValues(prev => ({
//       ...prev,
//       [sensor]: Number(value)
//     }));
//   };

//   // Updated to send all threshold values
//   const sendThresholdValues = async () => {
//     if (!selectedPort) {
//       setFeedback('Please select a port first.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/serial/set_thresholds/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(thresholdValues)
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         setFeedback('Threshold values set successfully.');
//       } else {
//         setFeedback(data.message || 'Error setting threshold values.');
//       }
//     } catch (error) {
//       console.error('Error setting thresholds:', error);
//       setFeedback('Error setting threshold values.');
//     }
//   };

//   const pins = ['PD3', 'PD4', 'PD5', 'PD6', 'PD7'];
  
//   // Updated sensor thresholds list
//   const sensorThresholds = [
//     'gas_sensor_1', 
//     'gas_sensor_2', 
//     'light_sensor', 
//     'vibration_sensor', 
//     'humidity_pressure_sensor'
//   ];

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">List of Communication Ports</h2>

//       <select
//         value={selectedPort}
//         onChange={handlePortChange}
//         className="w-full p-2 border rounded mb-4"
//       >
//         <option value="">Select Port</option>
//         {ports.map((port) => (
//           <option key={port} value={port}>
//             {port}
//           </option>
//         ))}
//       </select>

//       {currentActivePort && (
//         <p className="text-sm text-gray-600 mb-4">
//           Active Port: {currentActivePort}
//         </p>
//       )}

//       <h3 className="text-lg font-semibold mb-4">Device Commands</h3>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//         {pins.map((pin) => (
//           <button
//             key={pin}
//             onClick={() => handleCommandSend(pin)}
//             disabled={!selectedPort}
//             className={`
//               px-4 py-2 rounded transition-colors 
//               ${!selectedPort ? 'bg-gray-300 cursor-not-allowed' : 
//                 pinStates[pin] 
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }
//             `}
//           >
//             {pinStates[pin] ? `Deactivate ${pin}` : `Activate ${pin}`}
//           </button>
//         ))}
//       </div>

//       <h3 className="text-lg font-semibold mb-4">Sensor Threshold Settings</h3>

//       <div className="space-y-4 mb-4">
//         {sensorThresholds.map((sensor) => (
//           <div key={sensor} className="flex items-center space-x-4">
//             <label className="w-1/3 text-sm font-medium">{sensor}</label>
//             <input
//               type="number"
//               value={thresholdValues[sensor]}
//               onChange={(e) => handleThresholdChange(sensor, e.target.value)}
//               min="0"
//               max="1023"
//               className="w-1/3 p-2 border rounded"
//             />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={sendThresholdValues}
//         disabled={!selectedPort}
//         className={`
//           w-full px-4 py-2 rounded transition-colors 
//           ${!selectedPort 
//             ? 'bg-gray-300 cursor-not-allowed' 
//             : 'bg-green-500 hover:bg-green-600 text-white'
//           }
//         `}
//       >
//         Set Threshold Values
//       </button>

//       {feedback && (
//         <p className="mt-4 text-sm text-gray-600">
//           {feedback}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Device;







// import React, { useEffect, useState } from 'react';

// const Device = () => {
//   const [ports, setPorts] = useState([]);
//   const [selectedPort, setSelectedPort] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [currentActivePort, setCurrentActivePort] = useState(null);
//   const [pinStates, setPinStates] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });

//   useEffect(() => {
//     const fetchPorts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/available-ports/');
//         const data = await response.json();
//         setPorts(data.available_ports);
//       } catch (error) {
//         console.error('Error fetching COM ports:', error);
//         setFeedback('Failed to fetch COM ports.');
//       }
//     };

//     const checkCurrentPort = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/current_port/');
//         const data = await response.json();
        
//         if (data.status === 'active') {
//           setSelectedPort(data.current_port);
//           setCurrentActivePort(data.current_port);
//           setFeedback(`Currently active port: ${data.current_port}`);
//         }
//       } catch (error) {
//         console.error('Error checking current port:', error);
//       }
//     };

//     fetchPorts();
//     checkCurrentPort();

//     const portCheckInterval = setInterval(checkCurrentPort, 5000);

//     return () => clearInterval(portCheckInterval);
//   }, []);

//   const handlePortChange = async (event) => {
//     const port = event.target.value;
//     setSelectedPort(port);

//     if (port) {
//       try {
//         const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
//           method: 'GET',
//         });
//         const data = await response.json();
        
//         const currentPortResponse = await fetch('http://localhost:8000/serial/current_port/');
//         const currentPortData = await currentPortResponse.json();
        
//         if (currentPortData.status === 'active') {
//           setCurrentActivePort(currentPortData.current_port);
//         }

//         setFeedback(data.message || 'Started listening successfully.');
//       } catch (error) {
//         console.error('Error starting listener:', error);
//         setFeedback('Error starting listener.');
//       }
//     }
//   };

//   const handleCommandSend = async (pin) => {
//     const currentState = pinStates[pin];
//     const command = currentState ? `DEACTIVATE_${pin}` : `ACTIVATE_${pin}`;

//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       setFeedback(data.message || `${command} sent successfully.`);

//       if (response.ok) {
//         setPinStates((prevStates) => ({
//           ...prevStates,
//           [pin]: !currentState,
//         }));
//       }
//     } catch (error) {
//       console.error('Error sending command:', error);
//       setFeedback('Error sending command.');
//     }
//   };



//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">List of Communication Ports</h2>

//       <select
//         value={selectedPort}
//         onChange={handlePortChange}
//         className="w-full p-2 border rounded mb-4"
//       >
//         <option value="">Select Port</option>
//         {ports.map((port) => (
//           <option key={port} value={port}>
//             {port}
//           </option>
//         ))}
//       </select>

//       {currentActivePort && (
//         <p className="text-sm text-gray-600 mb-4">
//           Active Port: {currentActivePort}
//         </p>
//       )}

//       <h3 className="text-lg font-semibold mb-4">Device Commands</h3>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//         {['PD3', 'PD4', 'PD5', 'PD6', 'PD7'].map((pin) => (
//           <button
//             key={pin}
//             onClick={() => handleCommandSend(pin)}
//             disabled={!selectedPort}
//             className={`
//               px-4 py-2 rounded transition-colors 
//               ${!selectedPort ? 'bg-gray-300 cursor-not-allowed' : 
//                 pinStates[pin] 
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }
//             `}
//           >
//             {pinStates[pin] ? `Deactivate ${pin}` : `Activate ${pin}`}
//           </button>
//         ))}
//       </div>

     

      
        
//       {feedback && (
//         <p className="mt-4 text-sm text-gray-600">
//           {feedback}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Device;








// import React, { useEffect, useState } from 'react';

// const Device = () => {
//   const [ports, setPorts] = useState([]);
//   const [selectedPort, setSelectedPort] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [currentActivePort, setCurrentActivePort] = useState(null);
//   const [pinStates, setPinStates] = useState({
//     PD3: false,
//     PD4: false,
//     PD5: false,
//     PD6: false,
//     PD7: false,
//   });
//   const [gyroX, setGyroX] = useState(0);
//   const [autoMode, setAutoMode] = useState(false); // Track if automatic mode is enabled

//   useEffect(() => {
//     const fetchPorts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/available-ports/');
//         const data = await response.json();
//         setPorts(data.available_ports);
//       } catch (error) {
//         console.error('Error fetching COM ports:', error);
//         setFeedback('Failed to fetch COM ports.');
//       }
//     };

//     const checkCurrentPort = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/serial/current_port/');
//         const data = await response.json();
        
//         if (data.status === 'active') {
//           setSelectedPort(data.current_port);
//           setCurrentActivePort(data.current_port);
//           setFeedback(`Currently active port: ${data.current_port}`);
//         }
//       } catch (error) {
//         console.error('Error checking current port:', error);
//       }
//     };

//     fetchPorts();
//     checkCurrentPort();

//     const portCheckInterval = setInterval(checkCurrentPort, 5000);

//     // WebSocket logic to monitor sensor data
//     const socket = new WebSocket('ws://localhost:8000/ws/sensors/');
    
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       const gyroXValue = data.gyro_x;
//       setGyroX(gyroXValue);

//       // Automatically turn on PD3 if gyro_x exceeds 10 and autoMode is enabled
//       if (autoMode) {
//         if (gyroXValue > 2) {
//           handleCommandSend('PD3', true);
//         } else {
//           handleCommandSend('PD3', false);
//         }
//       }
//     };
    
//     return () => {
//       clearInterval(portCheckInterval);
//       socket.close();
//     };
//   }, [autoMode]); // Re-run effect when autoMode changes

//   const handlePortChange = async (event) => {
//     const port = event.target.value;
//     setSelectedPort(port);

//     if (port) {
//       try {
//         const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
//           method: 'GET',
//         });
//         const data = await response.json();
        
//         const currentPortResponse = await fetch('http://localhost:8000/serial/current_port/');
//         const currentPortData = await currentPortResponse.json();
        
//         if (currentPortData.status === 'active') {
//           setCurrentActivePort(currentPortData.current_port);
//         }

//         setFeedback(data.message || 'Started listening successfully.');
//       } catch (error) {
//         console.error('Error starting listener:', error);
//         setFeedback('Error starting listener.');
//       }
//     }
//   };

//   const handleCommandSend = async (pin, turnOn) => {
//     const command = turnOn ? `ACTIVATE_${pin}` : `DEACTIVATE_${pin}`;
    
//     try {
//       const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       setFeedback(data.message || `${command} sent successfully.`);
      
//       if (response.ok) {
//         setPinStates((prevStates) => ({
//           ...prevStates,
//           [pin]: turnOn,
//         }));
//       }
//     } catch (error) {
//       console.error('Error sending command:', error);
//       setFeedback('Error sending command.');
//     }
//   };

//   // Toggle automatic mode
//   const toggleAutoMode = () => {
//     setAutoMode((prevAutoMode) => !prevAutoMode);
//     setFeedback(autoMode ? 'Automatic Mode Disabled' : 'Automatic Mode Enabled');
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">List of Communication Ports</h2>

//       <select
//         value={selectedPort}
//         onChange={handlePortChange}
//         className="w-full p-2 border rounded mb-4"
//       >
//         <option value="">Select Port</option>
//         {ports.map((port) => (
//           <option key={port} value={port}>
//             {port}
//           </option>
//         ))}
//       </select>

//       {currentActivePort && (
//         <p className="text-sm text-gray-600 mb-4">
//           Active Port: {currentActivePort}
//         </p>
//       )}

//       <h3 className="text-lg font-semibold mb-4">Device Commands</h3>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//         {['PD3', 'PD4', 'PD5', 'PD6', 'PD7'].map((pin) => (
//           <button
//             key={pin}
//             onClick={() => handleCommandSend(pin, !pinStates[pin])}
//             disabled={!selectedPort || autoMode}
//             className={`
//               px-4 py-2 rounded transition-colors 
//               ${!selectedPort || autoMode ? 'bg-gray-300 cursor-not-allowed' : 
//                 pinStates[pin] 
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }
//             `}
//           >
//             {pinStates[pin] ? `Deactivate ${pin}` : `Activate ${pin}`}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={toggleAutoMode}
//         className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mb-4"
//       >
//         {autoMode ? 'Deactivate Automatic Mode' : 'Activate Automatic Mode'}
//       </button>

//       {feedback && (
//         <p className="mt-4 text-sm text-gray-600">
//           {feedback}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Device;








import './styles.css';

import React, { useEffect, useState } from 'react';

const Device = () => {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentActivePort, setCurrentActivePort] = useState(null);
  const [pinStates, setPinStates] = useState({
    PD3: false,
    PD4: false,
    PD5: false,
    PD6: false,
    PD7: false,
  });
  const [sensorValues, setSensorValues] = useState({
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,
    temperature: 0,
    light_intensity: 0,
  });
  const [autoMode, setAutoMode] = useState(false); // Track if automatic mode is enabled
  const [thresholds, setThresholds] = useState({
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,
    temperature: 20,
    light_intensity: 500,
  }); // Threshold values for each sensor

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const response = await fetch('http://localhost:8000/serial/available-ports/');
        const data = await response.json();
        setPorts(data.available_ports);
      } catch (error) {
        console.error('Error fetching COM ports:', error);
        setFeedback('Failed to fetch COM ports.');
      }
    };

    const checkCurrentPort = async () => {
      try {
        const response = await fetch('http://localhost:8000/serial/current_port/');
        const data = await response.json();
        
        if (data.status === 'active') {
          setSelectedPort(data.current_port);
          setCurrentActivePort(data.current_port);
          setFeedback(`Currently active port: ${data.current_port}`);
        }
      } catch (error) {
        console.error('Error checking current port:', error);
      }
    };

    fetchPorts();
    checkCurrentPort();

    const portCheckInterval = setInterval(checkCurrentPort, 5000);

    // WebSocket logic to monitor sensor data
    const socket = new WebSocket('ws://localhost:8000/ws/sensors/');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { gyro_x, gyro_y, gyro_z, temperature, light_intensity } = data;

      setSensorValues({
        gyro_x,
        gyro_y,
        gyro_z,
        temperature,
        light_intensity,
      });

      // Automatically control pins based on thresholds and autoMode
      if (autoMode) {
        handleAutomaticControl('PD3', 'gyro_x', gyro_x);
        handleAutomaticControl('PD4', 'gyro_y', gyro_y);
        handleAutomaticControl('PD5', 'gyro_z', gyro_z);
        handleAutomaticControl('PD6', 'temperature', temperature);
        handleAutomaticControl('PD7', 'light_intensity', light_intensity);
      }
    };
    
    return () => {
      clearInterval(portCheckInterval);
      socket.close();
    };
  }, [autoMode, thresholds]);

  const handlePortChange = async (event) => {
    const port = event.target.value;
    setSelectedPort(port);

    if (port) {
      try {
        const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
          method: 'GET',
        });
        const data = await response.json();
        
        const currentPortResponse = await fetch('http://localhost:8000/serial/current_port/');
        const currentPortData = await currentPortResponse.json();
        
        if (currentPortData.status === 'active') {
          setCurrentActivePort(currentPortData.current_port);
        }

        setFeedback(data.message || 'Started listening successfully.');
      } catch (error) {
        console.error('Error starting listener:', error);
        setFeedback('Error starting listener.');
      }
    }
  };

  const handleCommandSend = async (pin, turnOn) => {
    const command = turnOn ? `ACTIVATE_${pin}` : `DEACTIVATE_${pin}`;
    
    try {
      const response = await fetch(`http://localhost:8000/serial/send_command_to_serial/?command=${command}`, {
        method: 'GET',
      });
      const data = await response.json();
      setFeedback(data.message || `${command} sent successfully.`);
      
      if (response.ok) {
        setPinStates((prevStates) => ({
          ...prevStates,
          [pin]: turnOn,
        }));
      }
    } catch (error) {
      console.error('Error sending command:', error);
      setFeedback('Error sending command.');
    }
  };

  // Handle automatic control logic based on sensor value and threshold
  const handleAutomaticControl = (pin, sensor, sensorValue) => {
    if (sensorValue > thresholds[sensor]) {
      handleCommandSend(pin, true);
    } else {
      handleCommandSend(pin, false);
    }
  };

  // Toggle automatic mode
  const toggleAutoMode = () => {
    if (!autoMode) {
      // Deactivate all lights before entering automatic mode
      Object.keys(pinStates).forEach((pin) => {
        if (pinStates[pin]) {
          handleCommandSend(pin, false); // Deactivate active pins
        }
      });
    }

    setAutoMode((prevAutoMode) => !prevAutoMode);
    setFeedback(autoMode ? 'Automatic Mode Disabled' : 'Automatic Mode Enabled');
  };

  // Handle slider change for thresholds
  const handleThresholdChange = (sensor, value) => {
    setThresholds((prevThresholds) => ({
      ...prevThresholds,
      [sensor]: value,
    }));
    setFeedback(`${sensor} threshold set to: ${value}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">List of Communication Ports</h2>

      <select
        value={selectedPort}
        onChange={handlePortChange}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select Port</option>
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>

      {currentActivePort && (
        <p className="text-sm text-gray-600 mb-4">
          Active Port: {currentActivePort}
        </p>
      )}

      <h3 className="text-lg font-semibold mb-4">Device Commands</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {['PD3', 'PD4', 'PD5', 'PD6', 'PD7'].map((pin, index) => {
          const sensor = pin === 'PD3' ? 'gyro_x' : 
                         pin === 'PD4' ? 'gyro_y' : 
                         pin === 'PD5' ? 'gyro_z' : 
                         pin === 'PD6' ? 'temperature' : 'light_intensity';
          return (
            <button
              key={pin}
              onClick={() => handleCommandSend(pin, !pinStates[pin])}
              disabled={!selectedPort || autoMode}
              className={`
                px-4 py-2 rounded transition-colors 
                ${!selectedPort || autoMode ? 'bg-gray-300 cursor-not-allowed' : 
                  pinStates[pin] 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }
              `}
            >
              {pinStates[pin] ? `Deactivate ${pin}` : `Activate ${pin}`}
            </button>
          );
        })}
      </div>

      <button
        onClick={toggleAutoMode}
        className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mb-4"
      >
        {autoMode ? 'Deactivate Automatic Mode' : 'Activate Automatic Mode'}
      </button>

      {/* Threshold sliders with current values displayed */}
      {Object.keys(thresholds).map((sensor) => (
        <div key={sensor} className="mb-4">
          <label htmlFor={sensor} className="block text-sm font-medium text-gray-600 mb-2">
            {sensor.replace('_', ' ').toUpperCase()} Threshold: {thresholds[sensor]}
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id={sensor}
              min={sensor === 'gyro_x' || sensor === 'gyro_y' || sensor === 'gyro_z' ? -1.55 : 0}
              max={sensor === 'gyro_x' || sensor === 'gyro_y' || sensor === 'gyro_z' ? 1.55 : sensor === 'light_intensity' ? 1023 : 100}
              value={thresholds[sensor]}
              onChange={(e) => handleThresholdChange(sensor, parseFloat(e.target.value))}
              step={0.01}
              className="w-full"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Current value: {sensorValues[sensor]}</p>
        </div>
      ))}

      {feedback && (
        <p className="mt-4 text-sm text-gray-600">
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Device;
