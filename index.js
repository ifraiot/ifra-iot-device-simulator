 var mqtt = require('mqtt');

const MQTT_SERVER = "<server>";         // example: staging.mqtt.ifra.io
const MQTT_PORT = "<port>";             // Default 1883
const MQTT_USER = "<username>";         // example: dc5ec082-084d-4cac-84e0-684b08fe4b4a
const MQTT_PASSWORD = "<password>";     // example: 0e3ccc6d-edb1-4e32-a049-3ee38f1888de
const TOPIC = "<topic>"                 // example: organization/a369f4b8-77bc-4b88-8e38-24cae2a33340/messages
const MEASUREMENT_NAME = "<measurement name>"  // example: measurement
const UNIT = "<unit>"                   // example: %

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe(TOPIC, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
 // message is Buffer
    console.log(message.toString());
});

// Random number 0-10 send every 5 seconds
setInterval(() => {
    const RANDOM_NUMBER =  Math.floor(Math.random() * 11)
    client.publish(TOPIC, '[{ "n": "'+MEASUREMENT_NAME+'", "v": '+RANDOM_NUMBER+' , "u":"'+UNIT+'"}]');
}, 5000);


