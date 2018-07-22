let bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),

    port = 4200;


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain)

io.on('connection', function (client) {
    console.log("connected client");

    client.on('disconnect', function () {
        console.log("disconnected")
    });
});

app.post("/join", (req, res) => {
    io.emit('join', req.body);

    res.status(202);
    res.end();
});

app.post("/check-in", (req, res) => {
    io.emit('check-in', req.body);

    res.status(202);
    res.end();
});

app.post("/presence", (req, res) => {
    io.emit('presence', req.body);

    res.status(202);
    res.end();
});

server.listen({port: port}, () => {
    console.log(`Server started on ${port}`)
});
