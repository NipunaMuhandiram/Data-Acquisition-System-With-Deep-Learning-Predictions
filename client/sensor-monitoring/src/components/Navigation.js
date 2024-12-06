import React from 'react';
import { List, ListItemText } from '@mui/material';


import { useEffect, useState } from 'react';
// import InboxIcon from '@mui/icons-material/Inbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// import StarBorder from '@mui/icons-material/StarBorder';
import { BsEthernet } from "react-icons/bs";
import { BsWind,BsMoisture     } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { GiVibratingBall } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { MdOutlineAir } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { HiMiniCpuChip } from "react-icons/hi2";
import { TbBrandDatabricks } from "react-icons/tb";
import { TbHomeFilled } from "react-icons/tb";
import { MdOutlineDataSaverOff } from "react-icons/md";
import { GrConnectivity } from "react-icons/gr";
import { SiGamemaker } from "react-icons/si";;




const Navigation = ({ onSelect }) => {
  // const [open, setOpen] = useState(true);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const response = await fetch('http://localhost:8000/serial/available-ports/'); // Adjust URL if needed
        const data = await response.json();
        setPorts(data.available_ports);
      } catch (error) {
        console.error('Error fetching COM ports:', error);
      }
    };

    fetchPorts();
  }, []); // Run only on mount

  const handleChange = async (event) => {
    const port = event.target.value;
    setSelectedPort(port);

    if (port) {
      // Send request to start listening on the selected port
      try {
        const response = await fetch(`http://localhost:8000/serial/start-listening/?port=${port}`, {
          method: 'GET', // or 'POST' if you prefer
        });
        
        const data = await response.json();
        console.log(data.message); // Optional: Log the response message
      } catch (error) {
        console.error('Error starting listener:', error);
      }
    }
  };

  return (
    <div >
      <div className='avatar'>

        <Avatar sx={{ width: 56, height: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'black' }}>
        <SiGamemaker    size={30} />
        </Avatar>

      <ListItemText primary="welcome" className="unselectable-text" />

      </div>
      <div  className='navlist'>
      <List >

      <ListItemButton onClick={() => onSelect('Home')}>
                      <ListItemIcon>
                      <TbHomeFilled color="black"/>
                      </ListItemIcon>
                    <ListItemText primary="Home" primaryTypographyProps={{ fontSize: 13}} />
      </ListItemButton>

      <ListItemButton onClick={() => onSelect('DataTable')}>
                      <ListItemIcon>
                      <MdOutlineDataSaverOff color="black"/>
                      </ListItemIcon>
                    <ListItemText primary="Data" primaryTypographyProps={{ fontSize: 13}} />
      </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
            <TbBrandDatabricks color="black"/>
            </ListItemIcon>
            <ListItemText primary="Sensors" primaryTypographyProps={{ fontSize: 13}} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
              <Collapse in={open} timeout="auto" unmountOnExit>
                        
                          
                  <ListItemButton onClick={() => onSelect('gyro')}>
                      <ListItemIcon>
                      <MdOutlineAir color="black"/>
                      </ListItemIcon>
                    <ListItemText primary="Gyroscope" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>



                  <ListItemButton onClick={() => onSelect('temp')}>
                      <ListItemIcon>
                      <FaTemperatureHigh  color="black" />
                      </ListItemIcon>
                      <ListItemText primary="Temparature Sensor" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>



                  <ListItemButton onClick={() => onSelect('lightSensor')}>
                      <ListItemIcon>
                      <HiLightBulb color="black"/>
                      </ListItemIcon>
                      <ListItemText primary="Light Sensor" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>



                  <ListItemButton onClick={() => onSelect('vibrationSensor')}>
                      <ListItemIcon>
                      <GiVibratingBall color="black"/>
                      </ListItemIcon>
                      <ListItemText primary="Vibration Sensor" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>



                  <ListItemButton onClick={() => onSelect('pressure')}>
                      <ListItemIcon>
                      <WiHumidity color="black"/>
                      </ListItemIcon>
                      <ListItemText primary="Pressure" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>



                  <ListItemButton onClick={() => onSelect('AccelerationSensor')}>
                      <ListItemIcon>
                      <BsMoisture color="black"/>
                      </ListItemIcon>
                      <ListItemText primary="Acceleration" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>
                          
                  <ListItemButton onClick={() => onSelect('altitude')}>
                      <ListItemIcon>
                      <BsMoisture color="black"/>
                      </ListItemIcon>
                      <ListItemText primary="Altitude" primaryTypographyProps={{ fontSize: 13}} />
                  </ListItemButton>

              </Collapse>



              <ListItemButton onClick={() => onSelect('Device')}>
                      <ListItemIcon>
                      {/* <GrConnectivity color="black"/> */}
                      <BsEthernet color="black"/>
                      </ListItemIcon>
                    <ListItemText primary="Device" primaryTypographyProps={{ fontSize: 13}} />
                </ListItemButton>

                <ListItemButton onClick={() => onSelect('Pridictions')}>
                      <ListItemIcon>
                      <HiMiniCpuChip color="black"/>
                      </ListItemIcon>
                    <ListItemText primary="Pridictions" primaryTypographyProps={{ fontSize: 13}} />
                </ListItemButton>


                  
      </List>

      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedPort}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>COM</em>
            </MenuItem>
            {ports.map((port) => (
              <MenuItem key={port} value={port}>
                {port}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      </div>
    </div>
  );
};

export default Navigation;
