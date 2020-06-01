module.exports = (wss,message,fromServer) => {
	wss.connections.forEach( client => {
		let prefix = fromServer ? '[SERVER] ' : '';
		if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(`${prefix}${message}`);
	});
}