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

    this.elements = {};

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

        if (
            typeof data.id !== 'undefined' &&
            typeof this.elements[data.id] !== 'undefined' &&
            typeof this.elements[data.id].onEvent === 'function'
        ) {
            this.elements[data.id].onEvent(event, data);
        }
    };

    this.addElement = function(data) {
        const ElementType = require('../game/element/' + data.type);

        let element = new Element();
        element.id = data.id;
        element.type = data.type;
        element.parent = data.parent;
        element.element = new ElementType(data.element);

        this.elements[data.id] = element;

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

    this.removeElement = function(data) {
        if (typeof this.elements[data.id] === 'undefined') throw new Error('elementNotExisting');

        delete this.elements[data.id];

        this.eventEmitter.emit('event', {
            event: 'element.removed',
            id: data.id
        });
    };

    this.moveElement = function(data) {
        if (typeof this.elements[data.id] === 'undefined') throw new Error('elementNotExisting');

        this.elements[data.id].parent = data.parent;

        this.eventEmitter.emit('event', {
            event: 'element.moved',
            id: data.id,
            parent: data.parent,
            duration: data.duration
        });
    };
}