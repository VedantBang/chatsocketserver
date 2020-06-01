module.exports = class Func {
	constructor(wss){
		this.wss = wss;
	}
	relayMessage(conn, message, fromServer){
		this.wss.connections.forEach( client => {
			let prefix = fromServer ? '[SERVER] ' : '';
			if( client.remoteAddress !== conn.remoteAddress ) client.sendUTF(`${prefix}${message}`);
		});
	}
	setUsername(req,conn){
		conn.username = req.httpRequest.headers.username;
	}
}