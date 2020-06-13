A simple terminal chat application made with websockets.

The [websocket](https://www.npmjs.com/package/websocket) package.

For trying it out locally, start the server with `node server.js`. The server listens on all hosts on port `8765`.
To connect to it, run `node client.js`.

To connect to your own server instance, run `node client.js <host-ip>`.
For example to connect at localhost,  `node client.js localhost`, or equivalently `node client.js 127.0.0.1`.
To connect to a server instance on your network, `node client.js <ip-address-of-machine-running-the-instance>`.
