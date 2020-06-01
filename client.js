// interface for taking user input
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// creating the client
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

let username;

const commands = require('./commands/client');

// set the prompt to '>' 
rl.setPrompt('>');
// preserve position of cursor
const preserveCursor = true;

// handle connection failure
client.on('connectFailed', error => {
	console.log(`[ERROR] Error while connecting: ${error.toString()}`);
});

// on connecting
client.on('connect', conn => {
	// handle errors in connections
	conn.on('error', error => {
		console.log(`\n[ERROR] Error in connection: ${error.toString()}`);
	});
	// handle disconnect
	conn.on('close', () => {
		console.log('\nDisconnected');
		process.exit(0);
	});
	// on receving message
	conn.on('message', msg => {
		// print message and preserve pending user input
		if(msg.type === 'utf8') console.log(`\n${msg.utf8Data}`);
		rl.prompt({ preserveCursor });
	});
	// on pressing Ctrl+c
	rl.on('SIGINT', () => {
		// close the connection and the application
		conn.close();
		console.log('\nDisconnected');
		process.exit(0);
	});
	// on user input
	rl.on('line', data => {
		// check if input is command, do appropriate action
		if(commands.hasOwnProperty(data)) commands[data](conn);
		// otherwise send message
		else conn.send(`[${username}] ${data}`);
		rl.prompt({ preserveCursor });
	});	
});

// ask for username for connecting
rl.question('Enter a nickname: ', answer => {
	// if not provided, pick random
	username = answer || (`user${Math.floor(Math.random() * 100)}`);
	// get the hostname from command-line arguments, or default to the server running on herokuapp
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
	// connect to the server, passing in username in headers
	client.connect(url,null,null,{ username });
});


