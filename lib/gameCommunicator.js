'use strict';

const net = require('net');
const EventEmitter = require('events');

module.exports = GameCommunicator;

function GameCommunicator(port) {
    let self = this;

    this.tcpServer = null;
    this.eventEmitter = null;


    this.init = function(port) {
        this.tcpServer = net.createServer(function(socket) {
            self.eventEmitter.emit('connectionOpened', socket);

            let puffer = '';
            socket.on('data', function(data) {
                puffer += data;

                let dataArray = puffer.split(String.fromCharCode(0));
                for (let i = 0; i < dataArray.length - 1; i++) {
                    try {
                        let object = JSON.parse(dataArray[i]);
                        if (typeof object.action === 'undefined') {
                            //noinspection ExceptionCaughtLocallyJS
                            throw new Error('Data has no "action" field.');
                        }

                        //console.log("GC: got message", object.action, object.data);
                        self.eventEmitter.emit(object.action, socket, object.data);
                    } catch (e) {
                        self.sendCommand('error', 'unknownError', {message: 'Last sent data was invalid. Error: ' + e.toString()});
                    }
                }
                puffer = dataArray[dataArray.length - 1];
            });

            socket.on('close', function() {
                self.eventEmitter.emit('connectionClosed', socket);
            });

            socket.on('error', function(error) {});
        });
        this.tcpServer.listen(port);
        console.log("GameCommunicator-Server listening on port " + port);
        //TODO: TLS for tcp connection

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error', function(data) {});
    };
    this.init(port);
    
    this.sendCommand = function(socket, action, data) {
        //console.log("GC: sending data", action, data);
        socket.write(JSON.stringify({
            action: action,
            data: data
        }) + String.fromCharCode(0));
    };
}