'use strict';

const MethodError = require('../error/methodError');
const Element = require('./element');
const EventEmitter = require('events');

module.exports = MatchModel;

function MatchModel() {
    let self = this;

    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('error', function() {});

    this.id = null;

    this.game = null;

    this.settings = {};

    this.state = 'open';

    this.masterUserId = null;

    this.slots = [];

    this.elements = [];

    this.progress = 0;

    this.statusMessage = '';

    this.notifications = [];

    let gameProcess = null;

    let gameSocket = null;

    let startTime = null;

    this.setGameProcess = function(input) {
        gameProcess = input;
    };
    this.getGameProcess = function() {
        return gameProcess;
    };

    this.setGameSocket = function(input) {
        gameSocket = input;
    };
    this.getGameSocket = function() {
        return gameSocket;
    };

    this.setState = function(state) {
        this.state = state;

        if (this.state === 'running') {
            startTime = Date.now();
        }
    };

    this.handleEvent = function(event, data) {
        if (event === 'element.added') {
            this.addElement(data);
        }

        if (event === 'element.removed') {
            this.removeElement(data);
        }

        if (event === 'element.moved') {
            this.moveElement(data);
        }

        if (event === 'slot.activeChanged') {
            this.slots[data.slotIndex].active = data.isActive;

            this.eventEmitter.emit('slotsChanged');
        }

        if (event === 'slot.pointsChanged') {
            this.slots[data.slotIndex].points = data.points;

            this.eventEmitter.emit('slotsChanged');
        }

        if (event === 'progress.changed') {
            this.progress = data.progress;

            this.eventEmitter.emit('event', function(slotIndex) {
                return {
                    event: event,
                    progress: data.progress
                };
            })
        }

        if (event === 'statusMessage.changed') {
            this.statusMessage = data.text;

            this.eventEmitter.emit('event', function(slotIndex) {
                return {
                    event: event,
                    text: data.text
                };
            });
        }

        if (event === 'notification.added') {
            let notification = {
                time: startTime === null ? 0 : Math.floor((Date.now() - startTime) / 1000),
                text: data.text,
                targetPlayers: data.targetPlayers || null
            };
            this.notifications.push(notification);

            this.eventEmitter.emit('event', function(slotIndex) {
                if (!notification.targetPlayers || notification.targetPlayers.indexOf(slotIndex) > -1) {
                    return {
                        event: event,
                        time: notification.time,
                        text: notification.text
                    };
                }

                return null;
            });
        }

        if (typeof data.id !== 'undefined') {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].id === data.id && typeof this.elements[i].element.onEvent === 'function') {
                    let frontendData = this.elements[i].element.onEvent(event, data);

                    if (frontendData !== null && frontendData !== undefined) {
                        this.eventEmitter.emit('event', function (slotIndex) {
                            let returnData = {
                                event: event,
                                id: data.id
                            };

                            let playerData = frontendData;
                            if (typeof frontendData === 'function') {
                                playerData = frontendData(slotIndex);
                            }

                            for (let i in playerData) {
                                returnData[i] = playerData[i];
                            }

                            return returnData;
                        });
                    }
                }
            }
        }
    };

    this.addElement = function(data) {
        const ElementType = require('../game/element/' + data.type);

        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id === data.id) {
                throw new Error('elementAlreadyExisting');
            }
        }

        let element = new Element();
        element.id = data.id;
        element.type = data.type;
        element.parent = data.parent;
        element.element = new ElementType(data.element);

        this.elements.push(element);

        this.eventEmitter.emit('event', function(slotIndex) {
            return {
                event: 'element.added',
                id: element.id,
                type: element.type,
                parent: element.parent,
                element: element.element.transformToFrontend(slotIndex)
            };
        });
    };

    this.transformToFrontend = function(slotIndex) {
        let sanitizedElements = [];

        for (let i = 0; i < this.elements.length; i++) {
            sanitizedElements.push({
                id: this.elements[i].id,
                type: this.elements[i].type,
                parent: this.elements[i].parent,
                element: this.elements[i].element.transformToFrontend(slotIndex)
            });
        }

        let sanitizedNotifications = [];
        for (let i = 0; i < this.notifications.length; i++) {
            if (!this.notifications[i].targetPlayers || this.notifications[i].targetPlayers.indexOf(slotIndex) > -1) {
                sanitizedNotifications.push({
                    time: this.notifications[i].time,
                    text: this.notifications[i].text
                });
            }
        }

        return {
            id: this.id,
            game: this.game,
            settings: this.settings,
            state: this.state,
            masterUserId: this.masterUserId,
            slots: this.slots,
            elements: sanitizedElements,
            progress: this.progress,
            statusMessage: this.statusMessage,
            notifications: sanitizedNotifications
        };
    };

    this.removeElement = function(data) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id === data.id) {
                this.elements.splice(i, 1);

                this.eventEmitter.emit('event', {
                    event: 'element.removed',
                    id: data.id
                });

                return;
            }
        }

       throw new Error('elementNotExisting');
    };

    this.moveElement = function(data) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id === data.id) {
                this.elements[i].parent = data.parent;

                this.eventEmitter.emit('event', {
                    event: 'element.moved',
                    id: data.id,
                    parent: data.parent,
                    duration: data.duration
                });

                return;
            }
        }

        throw new Error('elementNotExisting');
    };

    this.handleElementMethod = function(elementId, method, data, slotIndex) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id === elementId) {
                if (typeof this.elements[i].element.onMethod !== 'function') {
                    throw new MethodError('method.methodNotFound');
                }

                return this.elements[i].element.onMethod(method, data, slotIndex);
            }
        }

        throw new MethodError('method.elementNotFound');
    };
}