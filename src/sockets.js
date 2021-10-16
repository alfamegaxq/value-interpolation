const {Server} = require("socket.io");
exports.initSockets = (server, db, getInterpolatedBalance) => {
    const {Server} = require("socket.io");
    const io = new Server(server);

    const EMIT_INTERVAL = 1000

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    setInterval(() => {
        getInterpolatedBalance(db, (balance) => {
            io.emit('balance', {balance});
        })
    }, EMIT_INTERVAL);
}
