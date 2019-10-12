# GameCentralStation - Backend
## Communication with frontend systems
The frontends can connect over TCP/IP to port 3701.

They have to send their data json-encoded with \0 after each message. Each data block must be an assoc array with an "action" field describing the action to be called. Optionally there can be a "data" field with additional data for that call.

They can listen to messages from the server. These messages have the same structure and encoding as above.

### Commands sent to frontend

#### ownUser
    {"id": 5, "displayName": "byWulf"}
    
Sends the user information of the current user to the frontend client.

### Receivable commands by backend
