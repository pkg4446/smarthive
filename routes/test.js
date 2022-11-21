const read = require("../controller/device/read");

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
