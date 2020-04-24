const http = require('http')
const {logger}=require('./startup/logging')
const config=require('config')
const {amqpStartUp} = require('./amqp/consumer')

const port = process.env.PORT || 8080 
require('./startup/db')()

const server = http.createServer((res,req) => {
    console.log((new Date()) + ' Received request for ' + req.url)
})

server.listen(port, () => {
    console.log((new Date()) + ' Server is listening on port 8080');
})

amqpStartUp()

module.exports = server