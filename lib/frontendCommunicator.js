const net = require('net');
const EventEmitter = require('events');

module.exports = FrontendCommunicator;

var User = function(id, displayName, socket) {
    this.id = id;
    this.displayName = displayName;
    this.socket = socket;

    this.sendCommand = function(action, data) {
        this.socket.write(JSON.stringify({
            action: action,
            data: data
        }) + String.fromCharCode(0));
    };

    this.sendCommand('user.ownDetails', {
        id: this.id,
        displayName: this.displayName
    });
};

function FrontendCommunicator(port) {
    var self = this;

    this.server = null;
    this.eventEmitter = null;
    
    this.users = {};
    this.userNames = ['Flitterring', 'Catcast',  'Clovergaze',  'Swampcharm',  'Quickshy',  'Wartcast',  'Cacklecurse',  'Beetlebug',  'Goldwing',  'Badsmoke',  'Frogstench',  'Beetlesquawk',  'Demonweed',  'Startlebone',  'Swampgoo',  'Leatherbug',  'Appleleaf',  'Spidercharm',  'Mooneyes',  'Newthowl',  'Giggleberry',  'Bloodtongue',  'Demonfist', 'Flutterbreeze', 'Goldkiss', 'Honeyflower', 'Goldring', 'Stewstench', 'Honeydust', 'Snowgaze', 'Silverdance', 'Shadowhowl', 'Flitterberry', 'Twinklesmile', 'Gentlering', 'Sparklestar', 'Sugarshy', 'Bristlecurse', 'Twinklebreeze', 'Swamptooth', 'Flamebug', 'Toadsquawk', 'Blackgnash', 'Honeystar', 'Flitterkiss', 'Silverstar', 'Clearglow', 'Demongnash', 'Moonfluff'];
    this.nextUserId = 1;

    this.init = function(port) {
        this.server = net.createServer(function(socket) {
            var user = self.createUser(socket);
            
            var puffer = '';
            socket.on('data', function(data) {
                puffer += data;

                var dataArray = puffer.split(String.fromCharCode(0));
                for (var i = 0; i < dataArray.length - 1; i++) {
                    try {
                        var object = JSON.parse(dataArray[i]);
                        if (typeof object.action === 'undefined') {
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
        this.server.listen(port);
        console.log("FrontendCommunicator-Server listening on port " + port);
        //TODO: TLS for tcp connection

        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error', function(data) {});
    };
    this.init(port);
    
    this.createUser = function(socket) {
        var user = this.users[this.nextUserId] = new User(
            this.nextUserId, 
            this.userNames[this.nextUserId % this.userNames.length] + ' #' + (Math.floor(this.nextUserId / this.userNames.length) + 1), 
            socket
        );
        this.nextUserId++;
        
        return user;
    }
}