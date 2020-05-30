const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer();
const port = process.env.PORT || 8765;
httpServer.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

const wss = new WebSocketServer({ httpServer });

wss.on('request', req => {
	const conn = req.accept(null, req.origin);
	console.log(`[NETWORK] Connected to ${conn.remoteAddress}`);
	conn.sendUTF('[SERVER] Connection estabilished');

	conn.on('close', (code,desc) => {
		console.log(`[NETWORK] ${conn.remoteAddress} disconnected`);
	});

	conn.on('message', msg => {
		console.log(`[MESSAGE] ${msg.utf8Data}`);
		wss.connections.forEach( client => {
			client.sendUTF(msg.utf8Data);
		});
	});
});
