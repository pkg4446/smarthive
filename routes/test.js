//const read = require("../controller/device/read");
const dummy_log = require("../references/dummy_log");

const ID1 = "94:B9:7E:42:2E:80";
const ID2 = "93:B8:6C:41:1A:79";
//test();
//94:B9:7E:42:2E:80
//50g/h
/*
setTimeout(() => 
    {
        let hour = 16
        let min  = 27;
        min += RandomIntC(5,10);
        dummy_door(ID2,true,hour,min);
        dummy_door(ID2,false,hour,min);
    }
, 1000);
*/

let interverMin     = 0;
let interverHour    = 0;
let interverDay     = 5;


let routine   = setInterval(async function() {
    setINTER();
}, 10);


function setINTER() {
    try {
        if(interverDay<=11){
            //dummy_O3(ID1,20,interverDay,interverHour,interverMin+2);
            dummy_O3(ID1,RandomIntC(0,11)/100,interverDay,interverHour,interverMin+2);
            let test = 0;
            for (let index = 0; index < 100; index++) {  
                test *= index;
            }
            //dummy_O3(ID2,20,interverDay,interverHour,interverMin+4);
            dummy_O3(ID2,RandomIntC(0,11)/100,interverDay,interverHour,interverMin+4);
            interverMin+=5;
            if(interverMin>60) {
                interverMin = interverMin%60;
                interverHour++;
            }
            if(interverHour >= 24){
                interverHour = 0;
                interverDay ++;
            }
        }
        
    } catch (err) {
        console.error(err);
    }
}

/*
let routine   = setInterval(async function() {
    try {
        for (let DAY = 26; DAY <= 27; DAY++) {
            for (let HOUR = 0; HOUR < 24; HOUR++) {
                for (let MIN = 0; MIN < 60; MIN++) {
                    dummy_O3(ID2,20,DAY,HOUR,MIN);
                }
                
            }            
        }
        
    } catch (err) {
        console.error(err);
    }
}, 2000);
*/
/*
setTimeout(() => 
    {
        
        let   min   = RandomIntC(0,22);
        const hour  = 14;
        dummy_door(ID1,true,hour,min);
        min += RandomIntC(8,19);
        dummy_door(ID1,false,hour,min);

        min = RandomIntC(38,60);
        dummy_door(ID2,true,hour,min);
        min += RandomIntC(8,19);
        dummy_door(ID2,false,hour,min);
        
    }
, 1000);
*/
async function dummy_door(ID,DATA,DAY,HOUR,MIN){    
    console.log("TEST");
    const data = {
        WAREHOUSE: ID,
        DATA:   DATA,
        YEAR:   2022,
        MONTH:  12,
        DAY:    DAY,
        HOUR:   HOUR,
        MIN:    MIN,
        SEC:    RandomInt()
    }
    console.log(data);
    dummy_log.log_door(data)
}

async function dummy_O3(ID,DATA,DAY,HOUR,MIN){    
    console.log("TEST");
    const data = {
        WAREHOUSE: ID,
        DATA:   DATA,
        YEAR:   2022,
        MONTH:  10,
        DAY:    DAY,
        HOUR:   HOUR,
        MIN:    MIN,
        SEC:    RandomInt()
    }
    dummy_log.log_O3(data)
}

function RandomIntB(){
    return Math.floor(Math.random() * (2));
}

function RandomInt(){
    return Math.floor(Math.random() * (60));
}

function RandomIntC(min,max){
    return Math.floor(Math.random() * (max+1) + min);
}

/*
async function test(){
    const farm = await read.user("테스터");
    const hive = await read.farm(farm[0].FARM);
    console.log(farm,hive);
}
let routine   = setInterval(async function() {
    try {
        test();
    } catch (err) {
        console.error(err);
    }
}, 5000);
*/