let bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),

    port = 4200;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


io.on('connection', function (client) {
    console.log("connected client");

    client.on('disconnect', function () {
        console.log("disconnected")
    });
});

app.post("/check-in", (req, res) => {
    io.emit('check-in', req.body);

    res.status(202);
    res.end();
});

server.listen({port: port}, () => {
    console.log(`Server started on ${port}`)
});
