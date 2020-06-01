const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer();
const port = process.env.PORT || 8765;

try{
	httpServer.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
} catch(err){
	console.log("[ERROR]");
	console.log("Please check if the server has permission to run on the host provided.");
	process.exit(0);
}


const wss = new WebSocketServer({ httpServer });
const commands = require('./commands/server');
const setUsername = require('./functions/setUsername');

wss.on('request', req => {
	const conn = req.accept(null, req.origin);
	setUsername(req,conn);
	console.log(`[NETWORK] Connected to ${conn.remoteAddress}`);
	conn.sendUTF('[SERVER] Connection estabilished');
	wss.connections.forEach( client => {
		if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(`[SERVER] ${conn.username} has joined`);
	});

	conn.on('close', (code,desc) => {
		console.log(`[NETWORK] ${conn.remoteAddress} disconnected`);
		wss.connections.forEach( client => {
			if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(`[SERVER] ${conn.username} has disconnected`);
		});
	});

	conn.on('message', msg => {
		console.log(`[MESSAGE] ${msg.utf8Data}`);

		wss.connections.forEach( client => {
			if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(msg.utf8Data);
		});
	});
});
