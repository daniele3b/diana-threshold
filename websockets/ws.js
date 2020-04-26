const WebSocketServer = require('websocket').server
const config = require('config')
let connection = undefined


function frontend_comunicate(msg) {
    if (connection === undefined) {
        console.log("Connection not correctly instatianted!")
        return;
    }
    connection.sendUTF(msg);
}


exports.startUpWebSocket = function startUpWebSocket(server) {
    wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    })

    function originIsAllowed(origin) {
        // put logic here to detect whether the specified origin is allowed.
        return true
    }

    wsServer.on('request', (request) => {
        if (!originIsAllowed(request.origin)) {
            request.reject()
            console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
            return;
        }

        connection = request.accept('diana-protocol', request.origin)
        console.log((new Date()) + ' Connection accepted.')

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data)
                if(message.utf8Data != config.get('admin_message')){
                    connection = undefined
                }
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
                connection.sendBytes(message.binaryData);
            }
        })

        connection.on("close", (reasonCode, description) => {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.') 
        })

        connection.on('error', (err) => {
            console.log(new Date() + " an error occurred : " +err)
        })
    })
}

exports.frontend_comunicate = frontend_comunicate