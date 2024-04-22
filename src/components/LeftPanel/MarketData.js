import { connectWebSocket } from '../../websocket';
import { useState, useEffect } from 'react';
import './MarketData.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Favorite';

let params = {
    "method": "SUBSCRIBE",
    "params": ["!ticker@arr"],
    "id":1
};

let url = 'wss://stream.binance.com:9443/ws';
function MarketData() {
    const [marketData, setMD] = useState([]);
    const [resp, setData] = useState([]);
    const [ws, setWs] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [buttonFilter, setbuttonFilter] = useState('');

    const [sortOrder, setSortOrder] = useState({
      'symbol': 'desc',
      'price': 'asc',
      'volume': 'asc', // Set default sort order to 'desc' for 24H volume
      'change': 'asc',
      'sortKey': 'symbol'
    });
    const [columns, setColumns] = useState([
      { id: 'symbol', label: 'SYMBOL' },
      { id: 'price', label: 'PRICE' },
      { id: 'volume', label: '24H VOL' },
      { id: 'change', label: 'CHANGE' }
    ]);
    
    const editPrice = (p) => {
      let power = 0, temp = p;
      while(temp>1){
        power+=1;
        temp/=10;
      }
      if (p<1) {return Math.trunc(p*(10**6))/(10**6)}
      else if (p<1000000) {return Math.trunc(p*(10**(6-power)))/(10**(6-power))}
      else {return Math.round(p)}
    }
    const editVolume = (v) => {
      if (v>10**9) {return Math.trunc(v/(10**7))/(10**2)+'B'}
      else if (v>10**6) {return Math.trunc(v/(10**4))/(10**2)+'M'}
      else if (v>10**3) {return Math.trunc(v/(10**1))/(10**2)+'K'}
      else {return Math.trunc(v*(10**2))/(10**2)}
    }

    useEffect(() => {
      
        const websocket = connectWebSocket(url, params, setData, ws);
        setWs(websocket);
        let temp = [];
        for (let i=0; i<resp.length; i++){
            temp.push({'symbol':resp[i]['s'], 'price':editPrice(resp[i]['c']), 'volume':parseFloat(resp[i]['v']), 'change':(Math.round(resp[i]['P']*10)/10).toString()+'%'});
          }
        let i=0, j=0;
        for (i=0; i<marketData.length; i++){
          for (j=0; j<temp.length; j++){
            if (marketData[i]['symbol'] == temp[j]['symbol']){
              break;
            }
          }
          if(j== temp.length){
            temp.push(marketData[i]);
          }  
        }
        setMD(temp);
    }, [resp, ws, searchTerm, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    buttonFilter === event ? setbuttonFilter("") : setbuttonFilter(event);
  };

  const handleSort = (column) => {
    setSortOrder({
      ...sortOrder,
      [column]: sortOrder[column] === 'asc' ? 'desc' : 'asc',
      'sortKey': column
    });
  };

  const sortedData = () => {
    marketData.sort((a, b) => {
        const column = sortOrder['sortKey'];
        if (sortOrder[column] === 'asc') { 
          if (column != 'symbol'){
            return parseFloat(a[column]) < parseFloat(b[column]) ? -1 : 1;
          }
          return a[column] < b[column] ? -1 : 1;
        } 
        else { 
          if (column != 'symbol'){
            return parseFloat(a[column]) > parseFloat(b[column]) ? -1 : 1;
          }
          return a[column] > b[column] ? -1 : 1;
        }
      })

      let temp = marketData.filter((item) => {
          return (item['symbol'].toLowerCase().indexOf(searchTerm.toLowerCase())>-1);
      });

      return temp.filter((item) => {
        if (buttonFilter===""){
          return item;
        }
        if (buttonFilter==="BTC" || buttonFilter==="ETH"){
          return (item['symbol'].toLowerCase().indexOf(buttonFilter.toLowerCase())===0);
        }
        return (item['symbol'].toLowerCase().indexOf(buttonFilter.toLowerCase())===item['symbol'].length-buttonFilter.length);
    });
  };

  const alignment = (id) => {
    if (id == 'symbol') { return 'left';}
    else {return 'right';}
  };


  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="   Search Symbol..."
        style={{ marginBottom: '10px', fontSize:'12', width:'100%', color: 'black', backgroundColor: 'white'}}
      />

           <tr>
          <th key='BTC' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('BTC')}>BTC</th>
          <th key='ETH' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('ETH')}>ETH</th>
          <th key='USD' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('USD')}>USD</th>
          <th key='EUR' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('EUR')}>EUR</th>
          <th key='USDC' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('USDC')}>USDC</th>
          <th key='USDT' align='center' style={{width: '20%', fontSize:12}} onClick = {()=> handleFilter('USDT')}>USDT</th>
          </tr>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
            <th key='symbol'  style={{width: '20%', fontSize:12}} onClick = {()=> handleSort('symbol')}>SYMBOL</th>
            <th key='price' align='right' style={{width: '30%', fontSize:12}} onClick = {()=> handleSort('price')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  PRICE</th>
            <th key='volume' style={{width: '30%', fontSize:12}} onClick = {()=> handleSort('volume')}>&nbsp;&nbsp;&nbsp;24H VOL</th>
            <th key='change' style={{width: '20%', fontSize:12}} onClick = {()=> handleSort('change')}>CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {sortedData().map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td className={column.id=='change'?(parseFloat(row.change)>0?'text-success':'text-danger'):''} 
                  key={column.id} align={alignment(column.id)} style={{width: '100px', fontSize:13}}>
                    {column.id=='volume'?editVolume(row[column.id]):row[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default MarketData;