'use strict';

const net = require('net');
const EventEmitter = require('events');
const GameService = require(__dirname + '/service/game');

module.exports = GameCommunicator;

function GameCommunicator(port) {
    let self = this;

    this.server = null;
    this.eventEmitter = null;


    this.init = function(port) {
        this.server = net.createServer(function(socket) {
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

                        self.eventEmitter.emit(object.action, socket, object.data);
                    } catch (e) {
                        self.sendCommand('error', {message: 'Last sent data was invalid. Error: ' + e.toString()});
                    }
                }
                puffer = dataArray[dataArray.length - 1];
            });

            socket.on('close', function() {
                self.eventEmitter.emit('connectionClosed', socket);
            });

            socket.on('error', function(error) {});
        });
        this.server.listen(port);
        console.log("GameCommunicator-Server listening on port " + port);
        //TODO: TLS for tcp connection

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error', function(data) {});
    };
    this.init(port);
    
    this.sendCommand = function(socket, action, data) {
        socket.write(JSON.stringify({
            action: action,
            data: data
        }) + String.fromCharCode(0));
    };
}