'use strict';

const EventError = require('../error/eventError');
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

    this.masterUser = null;

    this.slots = [];

    this.elements = [];

    let gameProcess = null;

    let gameSocket = null;

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

        if (typeof data.id !== 'undefined') {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].id === data.id && typeof this.elements[i].onEvent === 'function') {
                    this.elements[i].onEvent(event, data);
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

        return {
            id: this.id,
            game: this.game,
            settings: this.settings,
            state: this.state,
            masterUser: this.masterUser,
            slots: this.slots,
            elements: sanitizedElements
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
}