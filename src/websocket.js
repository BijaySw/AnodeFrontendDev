
//let url = 'wss://stream.binance.com:9443/ws';

export function connectWebSocket (url, params, setData, ws)
{
    // console.log(ws)
    if (ws == 1){
        ws = new WebSocket(url);
    }
    ws.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify(params));
    };
  
    ws.onmessage = (response) => {
        let newData = JSON.parse(response.data);
        setData(newData);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.close();
        ws = 1;
    };

    return ws;
  };
