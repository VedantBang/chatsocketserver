module.exports = (req,conn) => {
	conn.username = req.httpRequest.headers.username;
}