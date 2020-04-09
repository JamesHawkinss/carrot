## Database Structure

table "users"
    / id (auto increment)
    / username
    / passwordHash (bcrypt hash)

## Endpoints
/rooms - Returns an array of Room objects
/rooms/completed - Returns an array of all 'completed' Room objects
/rooms/in-progress - Returns an array of all 'in-progress Room objects
/room/:room - Returns a specific Room object, where :room is uniqueName
/room/create/:room - Creates a room and returns Room object, where :room is uniqueName
/room/:room/close - Closes a specified room, where :room is uniqueName

