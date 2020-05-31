const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

let username;

const commands = require('./commands/client');

rl.setPrompt('>');
const preserveCursor = true;

client.on('connectFailed', error => {
	console.log(`[ERROR] Error while connecting: ${error.toString()}`);
});

client.on('connect', conn => {
	conn.on('error', error => {
		console.log(`\n[ERROR] Error in connection: ${error.toString()}`);
	});
	conn.on('close', () => {
		console.log('\nDisconnected');
	});
	conn.on('message', msg => {
		if(msg.type === 'utf8') console.log(`\n${msg.utf8Data}`);
		rl.prompt({ preserveCursor });
	});
	rl.on('SIGINT', () => {
		conn.close();
		console.log('\nDisconnected');
		process.exit(0);
	});
	rl.on('line', data => {
		if(commands.hasOwnProperty(data)) commands[data](conn);
		else conn.send(`[${username}] ${data}`);
		rl.prompt({ preserveCursor });
	});	
});

rl.question('Enter a nickname: ', answer => {
	username = answer || (`user${Math.floor(Math.random() * 100)}`);
	let context = process.argv[2] || 'heroku';
	let url;
	switch(context){
		case 'heroku':
			url = 'ws://chatsocketserver.herokuapp.com/';
			break;
		default :
			url = `ws://${context}:8765`;
			break;
	}
	client.connect(url);
});


