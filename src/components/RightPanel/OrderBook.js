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
import $, { event } from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import useWebSocket from 'react-use-websocket';
import { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from '../../websocket';
import PropTypes from 'prop-types';
import PriceList from './PriceList';
import './OrderBook.css';
import CustomCard from './CustomCard';
import L2Book from './L2Book';
import Exchanges from './Exchanges'
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

export default function TopRightPanel() {

  let params = {
    "reqid": 1,
    "type": "subscribe",
    "ts": "time",
    "streams": [
      {
        "Symbol": "BTCUSDT",
        "name": "OrderBook"
      },
    {
        "Symbol": "ETHUSD",
        "name": "OrderBook"
      }
    
    ]
  };
  let url = 'wss://scorpion-solid-precisely.ngrok-free.app/stream';
    // const WS_URL = 'wss://scorpion-solid-precisely.ngrok-free.app/stream';
    // const{sendJsonMessage,lastJsonMessage} = useWebSocket(WS_URL)
    const [crypto, setCrypto] = React.useState('');
    const [book, setBook] = React.useState('AggBook');
    const [book1, setBook1] = React.useState('AggBook');
    const [book2, setBook2] = React.useState('AggBook');
    const [marketCardData, setCardMD] = useState([]);
    const [cardResp, setCardData] = useState([]);
    const [wsCard, setCardWs] = useState(1);

    const handleChange = (event) => {
      setCrypto(event.target.value);
      console.log(crypto);
    };

    const handleBookChange = (event) => {
      setBook(event.target.value);
      console.log(event.target.value);
      SetAggBook(event.target.value.toString() === 'AggBook');
      SetL2Book(event.target.value.toString() === 'L2Book');
      SetExchange(event.target.value.toString() === 'Exchanges');
    };

    const handleBookChange1 = (event) =>{
      setBook1(event.target.value);
      console.log(event.target.value);
      SetAggBook1(event.target.value.toString() === 'AggBook');
      SetL2Book1(event.target.value.toString() === 'L2Book');
      SetExchange1(event.target.value.toString() === 'Exchanges');
    }

    const handleBookChange2 = (event) =>{
      setBook2(event.target.value);
      console.log(event.target.value);
      SetAggBook2(event.target.value.toString() === 'AggBook');
      SetL2Book2(event.target.value.toString() === 'L2Book');
      SetExchange2(event.target.value.toString() === 'Exchanges');
    }

    //const THROTTLE = 50;
    //const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    //const SymbolData = data.data[0].Symbol;
    console.log(wsCard);


    useEffect(() => {
      
      const websocket = connectWebSocket(url, params, setCardData, wsCard);
      setCardWs(websocket);
      setCardMD(websocket);
      console.log(wsCard);
      console.log(book);
  }, [cardResp, wsCard]);

  const[isAggBook, SetAggBook ]= useState(book.toString() === 'AggBook');
  const[isL2Book, SetL2Book ]= useState(book.toString() === 'L2Book');
  const[isExchange, SetExchange]= useState(book.toString() === 'Exchanges');

  const[isAggBook1, SetAggBook1 ]= useState(book.toString() === 'AggBook');
  const[isL2Book1, SetL2Book1 ]= useState(book.toString() === 'L2Book');
  const[isExchange1, SetExchange1]= useState(book.toString() === 'Exchanges');

  const[isAggBook2, SetAggBook2 ]= useState(book.toString() === 'AggBook');
  const[isL2Book2, SetL2Book2 ]= useState(book.toString() === 'L2Book');
  const[isExchange2, SetExchange2]= useState(book.toString() === 'Exchanges');

  return (
    <div>
    <div class="row row-cols-1 row-cols-md-4 g-10">
      <div class="col">
        <div class="card" style={{fontSize: 11, background:"black"}}>
          <div class="card-body nopadding containedbox">
            <div class="d-flex justify-content-center">
              <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center',background:'white'}} size="small" >
                <Select
                  value={crypto}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''> BTC USD</MenuItem>
                  <MenuItem value={20}>ETH USD</MenuItem>
                  <MenuItem value={30}>SOL USD</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div class="d-flex justify-content-center">
            <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center', background:'white'}} size="small" >
              <Select
                value={book}
                onChange={handleBookChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value='AggBook'> AGG Book</MenuItem>
                <MenuItem value='L2Book'>L2 Book</MenuItem>
                <MenuItem value='Exchanges'>EXCHANGES</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div class="d-flex justify-content-around">
            <div class="square"> <p class="text">70000.68</p></div>
              {/* <div class="p-1 bd-highlight"><button type="button" class="btn btn-dark">70000.68</button></div> */}
              <div class="p-1 bd-highlight"> <input min="1" max="100" type="number" id="typeNumber" class="form-control nopadding textAlignCenter" /></div>
              <div class="square"> <p class="text">70000.05</p></div>
            </div>
            {isAggBook &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isL2Book &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isAggBook &&(<PriceList/>)}
            {isL2Book && (<L2Book/>)}
            {isExchange &&(<Exchanges/>)}
          </div>
        </div>   
      </div>
      <div class="col">
        <div class="card" style={{fontSize: 11, background:"black"}}>
          <div class="card-body nopadding containedbox">
            <div class="d-flex justify-content-center">
              <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center',background:'white'}} size="small" >
                <Select
                  value={crypto}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''> BTC USD</MenuItem>
                  <MenuItem value={20}>ETH USD</MenuItem>
                  <MenuItem value={30}>SOL USD</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div class="d-flex justify-content-center">
            <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center', background:'white'}} size="small" >
              <Select
                value={book1}
                onChange={handleBookChange1}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value='AggBook'> AGG Book</MenuItem>
                <MenuItem value='L2Book'>L2 Book</MenuItem>
                <MenuItem value='Exchanges'>EXCHANGES</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div class="d-flex justify-content-around">
            <div class="square"> <p class="text">70000.68</p></div>
              {/* <div class="p-1 bd-highlight"><button type="button" class="btn btn-dark">70000.68</button></div> */}
              <div class="p-1 bd-highlight"> <input min="1" max="100" type="number" id="typeNumber" class="form-control nopadding textAlignCenter" /></div>
              <div class="square"> <p class="text">70000.05</p></div>
            </div>
            {isAggBook1 &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isL2Book1 &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isAggBook1 &&(<PriceList/>)}
            {isL2Book1 && (<L2Book/>)}
            {isExchange1 &&(<Exchanges/>)}
          </div>
        </div>   
      </div>
      <div class="col">
        <div class="card" style={{fontSize: 11, background:"black"}}>
          <div class="card-body nopadding containedbox">
            <div class="d-flex justify-content-center">
              <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center',background:'white'}} size="small" >
                <Select
                  value={crypto}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''> BTC USD</MenuItem>
                  <MenuItem value={20}>ETH USD</MenuItem>
                  <MenuItem value={30}>SOL USD</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div class="d-flex justify-content-center">
            <FormControl sx={{ m: 1, minWidth: 120,  display: 'flex', justifyContent: 'center', background:'white'}} size="small" >
              <Select
                value={book2}
                onChange={handleBookChange2}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value='AggBook'> AGG Book</MenuItem>
                <MenuItem value='L2Book'>L2 Book</MenuItem>
                <MenuItem value='Exchanges'>EXCHANGES</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div class="d-flex justify-content-around">
            <div class="square"> <p class="text">70000.68</p></div>
              {/* <div class="p-1 bd-highlight"><button type="button" class="btn btn-dark">70000.68</button></div> */}
              <div class="p-1 bd-highlight"> <input min="1" max="100" type="number" id="typeNumber" class="form-control nopadding textAlignCenter" /></div>
              <div class="square"> <p class="text">70000.05</p></div>
            </div>
            {isAggBook2 &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isL2Book2 &&(<div class="d-flex justify-content-center">
              <div class=""> <div class="rectangle"> <p class="text">Bids</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">RFQ</p></div></div>
              <div class=""><div class="rectangle"> <p class="text">Asks</p></div></div>
            </div>)}
            {isAggBook2 &&(<PriceList/>)}
            {isL2Book2 && (<L2Book/>)}
            {isExchange2 &&(<Exchanges/>)}
          </div>
        </div>   
      </div>
    </div>
    </div>
  );
}















// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// function TopRightPanel() {
//     const [cards, setCards] = useState([
//       { id: '1', content: 'Card 1' },
//       { id: '2', content: 'Card 2' },
//       { id: '3', content: 'Card 3' }
//     ]);
  
//     const handleAddCard = () => {
//       const newCard = {
//         id: Math.random().toString(),
//         content: `Card ${cards.length + 1}`
//       };
//       setCards([...cards, newCard]);
//     };
  
//     const handleRemoveCard = (id) => {
//       setCards(cards.filter(card => card.id !== id));
//     };
  
//     const handleDragEnd = (result) => {
//       if (!result.destination) return;
//       const newCards = Array.from(cards);
//       const [reorderedCard] = newCards.splice(result.source.index, 1);
//       newCards.splice(result.destination.index, 0, reorderedCard);
//       setCards(newCards);
//     };
  
//     return (
//       <div className="top-right-panel">
//         <h2>Top Right Panel</h2>
//         <button onClick={handleAddCard}>Add Card</button>
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="cards">
//             {(provided) => (
//               <ul {...provided.droppableProps} ref={provided.innerRef}>
//                 {cards.map((card, index) => (
//                   <Draggable key={card.id} draggableId={card.id} index={index}>
//                     {(provided) => (
//                       <li
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="card" // Add class for card
//                       >
//                         {card.content}{' '}
//                         <button onClick={() => handleRemoveCard(card.id)}>Remove</button>
//                       </li>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     );
//   }

// export default TopRightPanel;