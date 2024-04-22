import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
//import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import useWebSocket from 'react-use-websocket';
import { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from '../../websocket';
import PropTypes from 'prop-types';
import PriceList from './PriceList';
import './CustomCard.css';
//import throttle from 'lodash.throttle';



function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1/2,
        m: 1/2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.6rem',
        fontWeight: '800',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function CustomCard() {

    const [crypto, setCrypto] = React.useState('');
    const handleChange = (event) => {
        setCrypto(event.target.value);
      };
  

    return (
    <div class="squaree container" >
        <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex' }}  background-color= "white" size="small" >
        <Select
            value={crypto}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
        >
            <MenuItem value=""> BTC USD</MenuItem>
            <MenuItem value={20}>BTC INR</MenuItem>
            <MenuItem value={30}>BTC NP</MenuItem>
        </Select>
        </FormControl>
        <PriceList/>
    </div>
    );
}


