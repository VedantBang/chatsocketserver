module.exports = (wss,message) => {
	wss.connections.forEach( client => {
		if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(`[SERVER] ${message}`);
	});
}