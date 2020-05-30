const WebSocket = require('ws');
 
const ws = new WebSocket('ws://www.host.com/path');
 
const readline = require('readline');
const rl = readline.createInterface({
  	input: process.stdin,
  	output: process.stdout
});

rl.question("Enter a nickname: ", function(answer) {
	const nick = answer || ("user"+((Math.floor(Math.random()*10000)).toString()));

	ws.on('message', function incoming(data) {
  		console.log(data);
	});

	ws.on('open', function open() {
  		rl.on('line', function getData(data){
  			ws.send(`[${nick}]: ${data}`);
  		});
	});
});
 
