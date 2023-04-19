const mqtt      = require("mqtt");
const regist    = require('../controller/device/regist');
const update    = require('../controller/device/update');

const options   = {
    host:       process.env.host,
    port:       1883,
    protocol:   "mqtt",
    username:   process.env.mqttuser,
    password:   process.env.mqttpass,
};
const client = mqtt.connect(options);

client.subscribe("SHS");
client.subscribe("WAREHOSE");

client.on("error", (error) => {console.log("Can't connect" + error);});
client.on("connect", () => {console.log("connected: "+ client.connected);});

client.on("message", async(topic, message) => {	
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}, ID:${client.getLastMessageId()}`);
    const device = message.toString().split('=');
    if(topic.toString() == "SHS"){
        try {
            if(device[0] == "ID"){
                await regist.init_farm(device[1]);
            }        
        } catch (error) {
            console.error(error);
        }    
    }else if(topic.toString() == "WAREHOSE"){
        try {
            if(device[0] == "ID"){
                await regist.init_warehouse(device[1]);
            }else if(device[1] == "AT+ON"){
                await update.warehouse_update(device[0],"USE",1);
            }else if(device[1] == "AT+OFF"){
                await update.warehouse_update(device[0],"USE",0);
            }else if(device[1] == "AT+TO"){
                await update.warehouse_update(device[0],"ON",device[2]);
            }else if(device[1] == "AT+TC"){
                await update.warehouse_update(device[0],"OFF",device[2]);
            }
        } catch (error) {
            console.error(error);
        }          
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