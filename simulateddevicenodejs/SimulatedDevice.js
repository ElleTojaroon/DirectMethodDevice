'use strict';

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;

var connectionString = 'HostName=IotHubC2D.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=JI50XEJNyExM+hvFvQG5oA2KEHxJa9suA83GycTV7As=';
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

function onWriteLine(request, response) {
    console.log(request.payload);

    response.send(200, 'Input was written to log.', function(err) {
        if(err) {
            console.error('An error occurred when sending a method response:\n' + err.toString());
        } else {
            console.log('Response to method \'' + request.methodName + '\' sent successfully.' );
        }
    });
}

client.open(function(err) {
    if (err) {
        console.error('could not open IotHub client');
    }  else {
        console.log('client opened');
        client.onDeviceMethod('writeLine', onWriteLine);
    }
});