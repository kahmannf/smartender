# Structur:

- fronend (Angular single-page app) <--http--> backend (Node.js server)
- backend (Node.js server) <--http--> machine-manager (??? server)
- machine-manager (??? server) <--???--> machine (modem)
- machine (modem) <--TTL--> machine (Arduino)

## fronend (Angular single-page app) <--http--> backend (Node.js server)
Frontend is able to create a machine command from a drink object or other commands.
This command is send to the backend. Frontend can request a machine object containing the status of a machine.

## backend (Node.js server) <--http--> machine-manager (??? server)
Backend recives machine-commands and redirects them to the machine-manager. The machinekey will be transmitted with each command.

Backend can request a live status via `baseurl_machinemamager/status/:machinekey`. The machinemanager will respond with a json object:
```json
{
  "available": "boolean, represents wheter the machine is online and registered at the machinemanager", 
  "busy": "boolean, represents whether the machine is currently operating or available"
}
```

When a machine status changes (connected/disconnected, available/busy) the machinemamager reports a change to the backend via `baseurl_backend/machine_service/report/:machinekey`.
The backend is then supposed to get the new status in a seperate request.

## machine-manager (??? server) <--???--> machine (modem)
The modem will report the status of the machine in some way.
This includes a change in connected/disconnected, available/busy.

The manager is able to request the current status in some way

The machinemanager will send commands to the machine.

## machine (modem) <--TTL--> machine (Arduino)
The modem will send the command to the arduino.

The arduino reports its status the the modem (available/busy)

# Commands

## Concept 1: Simple Start and End

A command is a set of operation-commands with a start and end marker.
An operation command is a set of three bytes:
1. Operation order: Commands with the same operation order will be executed simultanious. Others in order. Min value: 0
2. Slot id: Id of the slot that should be opened
3. Opreation length/time: the time that this operation should be executed for. Unit is seconds/10. 0 is invalid. -1/255 is a special value: The slot should stay opened until a new command with that slot and a time parameter of -1 is send. A command with this parameter cannot contain operation-commands with a time parameter != -1.

Draft:
  start marker:   253 / -3
  end marker:     254 / -2

Example:

This will open slot 0, 1 and 2 simultanious. Slot 0 and 1 will sty opened for 1 second, slot 2 for 2 seconds. 
After slot 2 is closed, slot 3 will be opend for 5 seconds.
Notice that this operation command has the command order 5. it is not required to have a 1, 2, 3 and 4 in order to use a 5

253 

0 
0 
10 

0 
1 
10 

0 
2 
20 

5
3 
50 

254

## Concept 2: Small Protocoll

All data is send within a frame. This frame defines the data structure and length. A checksum will be appended after the end marker.


### Smartender Arduino Serial Protocol (Version 0):
  
  |description|value (unsinged or < 8-Bit Integer)|value (bitwise)|bytes|
  |-|-|-|-|
  start marker|   2^24| 11111111 - 11111111 - 11111111 | 3|
  protocol version (in case futher logic changes)|-|-|2|
  length (total bytes of data, not including header or end marker)|0-2^16|-| 2|
  data|-|-|as many as value of length|
  end marker|    2^24-1| 11111111 - 11111111 - 11111110 | 3|
  checksum: something to validate the integrity of the data|-|-|1|

Smartender Arduino Serial Protocol version 0 data are always three bytes. They have the same structure as the commands in Concept 1.

