exports.initSockets = (server, db, getInterpolatedValue) => {
    const {Server} = require("socket.io");
    const io = new Server(server);

    const EMIT_INTERVAL = 1000

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    setInterval(() => {
        getInterpolatedValue(db, (value) => {
            io.emit('value', {value});
        })
    }, EMIT_INTERVAL);
}
