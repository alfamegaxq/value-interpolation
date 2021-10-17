const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const mysql = require('mysql')
const {getInterpolatedValue, updateValue} = require("./valueService");
const {initSockets} = require("./sockets");

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

// Get initial value
app.get('/api/value', (req, res) => {
    getInterpolatedValue(db, (value) => res.send(`${value}`))
});

// Update value
app.post('/api/value', (req, res) => {
    updateValue(db, req.body.value)
    res.send('ok')
})

server.listen(3333, () => {
    console.log('listening on 0.0.0.0:3333')
});

initSockets(server, db, getInterpolatedValue)
