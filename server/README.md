# Endpoints
## Video
### Rooms
 - GET /rooms - Returns an array of Room objects
 - GET /rooms/completed - Returns an array of all 'completed' Room objects
 - GET /rooms/in-progress - Returns an array of all 'in-progress Room objects
 - GET /room/:roomSid - Returns a specific Room object
 - POST /room/create/:name - Creates a room and returns Room object, where :name is uniqueName
 - DELETE /room/:roomSid/close - Closes a specified room

### Participants
 - GET /room/:room/participant/:participantSid - Returns a Participant object
 - GET /room/:roomSid/connected - Returns an array of participantSid for all connected participants
 - POST /room/:roomSid/token/create/:identifier - Returns an object with a key/value pair for 'token'. :identifier is ideally the username of the participant.
 - PATCH /room/:roomSid/participant/:participantSid/disconnect - Disconnects a participant from a room.

## Users
 - GET /users - Returns an array of User objects.
 - GET /user/:id - Returns an array of a single User object.
 - POST /user/create - Creates a user and returns an array of a single User object.
 - DELETE /user/:id/delete - Deletes a user.

### Authentication
 - POST /user/auth - Compares a given password with a stored hash and returns 'auth OK' or 'auth FAILED'.

## Chat
### Servers