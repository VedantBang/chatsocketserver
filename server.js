const WebSocket = require('ws');
const http = require('http');

const server = http.createServer()

const wss = new WebSocket.Server({ server });
 
function relayMessage(data,ws){
	wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
}

wss.on('connection', function connection(ws){
	ws.on('message', function resp(data){
		relayMessage(data,ws);
	});
});

server.listen(process.env.PORT || 8765, ()=>{
	console.log(process.env.PORT);
});
// 157.47.4.245