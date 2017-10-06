// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const http = require('http');

const app = express()



app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("Running on port " + port));



