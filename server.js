const WebSocket = require('ws');
const http = require('http');

const server = http.createServer()

const wss = new WebSocket.Server({ server });
 
function relayMessage(data,ws){
	wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        console.log("data sent");
      }
    });
}

wss.on('connection', function connection(ws){
	ws.on('message', function resp(data){
		console.log("Received: " + data);
		relayMessage(data,ws);
	});
});

const port = process.env.PORT || 8765;
server.listen(port, ()=>{
	console.log("Started on port: " + port);
});
