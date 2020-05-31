module.exports = {
	'/disconnect': function(conn){
		conn.close();
		console.log('Disconnected');
		process.exit(0);
	}
}