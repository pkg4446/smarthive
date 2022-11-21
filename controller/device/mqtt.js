const mqtt      = require("mqtt");
const regist    = require('../../controller/device/regist');

const options   = {
    host:       process.env.host,
    port:       1883,
    protocol:   "mqtt",
    username:   process.env.mqttuser,
    password:   process.env.mqttpass,
};
const client = mqtt.connect(options);

client.subscribe("SHS");

client.on("error", (error) => {console.log("Can't connect" + error);});
client.on("connect", () => {console.log("connected: "+ client.connected);});

client.on("message", async(topic, message) => {	
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}, ID:${client.getLastMessageId()}`);
    const device = message.toString().split('=');
    
    try {
        if(device[0] == "ID"){
            await regist.regist_farm(device[1]);
        }        
    } catch (error) {
        console.error(error);
    }    
});
//client.end();

module.exports = {
    send : async function(data){
        const res = {
            pass: true,
            data: null
        }
        try {
            console.log(data)
            sendMQTT(data.TARGET, data.COMMEND);
        } catch (error) {
            res.pass = false;
        }        
        return res;
    },
}

function sendMQTT(target,contents){
    console.log("send: ",target, "message: ",contents);
    client.publish(target,contents,{qos:2});  
}