const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const mysql = require('mysql')
const {getInterpolatedBalance} = require("./balanceService");
const {initSockets} = require("./sockets");
const {updateBalance} = require("./balanceService");

const db = mysql.createConnection({
    host: 'mysql',
    user: 'project',
    password: 'project',
    database: 'project',
})

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
// Odometer library
app.get('/odometer.js', (req, res) => {
    const file = __dirname + '/lib/odometer.js'
    res.contentType(file).sendFile(file)
})

// Get initial balance
app.get('/api/balance', (req, res) => {
    getInterpolatedBalance(db, (balance) => res.send(`${balance}`))
});

// Update balance
app.post('/api/balance', (req, res) => {
    updateBalance(db, req.body.balance)
    res.send('ok')
})

server.listen(3333, () => {
    console.log('listening on 0.0.0.0:3333')
});

initSockets(server, db, getInterpolatedBalance)
