'use strict';

const socketio = require('socket.io');
const net = require('net');
const EventEmitter = require('events');
const userService = require('./service/user.service');
const gameService = require('./service/game.service');
const express = require('express');

module.exports = FrontendCommunicator;

function FrontendCommunicator(ports) {
    let self = this;

    this.tcpServer = null;
    this.websocketServer = null;
    this.expressServer = null;
    this.eventEmitter = null;

    /*this.createTcpServer = function(port) {
        this.tcpServer = net.createServer(function(socket) {
            let user = self.createUser(function(action, data) {
                socket.write(JSON.stringify({
                    action: action,
                    data: data
                }) + String.fromCharCode(0));
            });

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

                        self.eventEmitter.emit(object.action, user, object.data);
                    } catch (e) {
                        user.sendCommand('error', {message: 'Last sent data was invalid. Error: ' + e.toString()});
                    }
                }
                puffer = dataArray[dataArray.length - 1];
            });

            socket.on('close', function() {
                delete self.users[user.id];
            });

            socket.on('error', function(error) {});
        });
        this.tcpServer.listen(port);
        console.log("FrontendCommunicator-TCP-Server listening on port " + port);
        //TODO: TLS for tcp connection
    };*/

    this.createWebsocketServer = function(port) {
        this.websocketServer = socketio();
        this.websocketServer.on('connection', function(client) {
            let user = userService.createUser(function(action, data) {
                //console.log("FC: sending message ", action, data);
                client.emit(action, data)
            });

            client.on('event', function(action, data, messageId) {
                //console.log("FC: got message ", action, data, messageId);
                self.eventEmitter.emit(action, user, data, function(data) {
                    user.sendCommand('eventCallback', {messageId: messageId, data: data});
                }, function(error, description) {
                    user.sendCommand('eventErrorCallback', {messageId: messageId, error: error, description: description});
                });
            });

            client.on('disconnect', function() {
                userService.removeUser(user);
            });
        });
        this.websocketServer.listen(port);
        console.log('FrontendCommunicator-Websocket-Server listening on port ' + port);
    };

    this.createCdnServer = function(port) {
        this.expressServer = express();

        this.expressServer.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.expressServer.listen(port, function() {
            console.log('FrontendCommunicator-CDN-Server listening on port ' + port);
        });

        gameService.eventEmitter.on('gameAdded', function(game) {
            self.expressServer.use('/' + game.key, express.static(game.getPath() + '/public'));
        });
    };

    this.init = function(ports) {
        //if (typeof ports.tcp !== 'undefined') this.createTcpServer(ports.tcp);
        if (typeof ports.websocket !== 'undefined') this.createWebsocketServer(ports.websocket);
        if (typeof ports.cdn !== 'undefined') this.createCdnServer(ports.cdn);

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error', function(data) {});
    };
    this.init(ports);
}