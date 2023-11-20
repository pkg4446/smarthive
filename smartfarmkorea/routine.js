require("dotenv").config({ path: "../.env" });

const axios         = require('axios');
const {sequelize}   = require('../models');
const { Op }        = require("sequelize");
const farm          = require('../models/smartfarmkorea');
const sensor        = require('../models/sensor');
const sensor_log    = require('../models/log_sensor');

let time_day_h  = 0;
let time_hour   = 0;

const txtH = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:smar="http://smart.webservice.itis.epis.org/">
                <soapenv:Header/>
                <soapenv:Body>
                <smar:sendSmartMessage>
            <arg0>`;
const txtE = `</arg0>
            </smar:sendSmartMessage>
            </soapenv:Body>
            </soapenv:Envelope>`;
const config =  {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        SOAPAction:""
                        }
                };

ITServerPost = setInterval(async function() {
    let time_now = new Date();
    if(time_now.getHours() != time_hour){
        time_hour = time_now.getHours();
        time_now.setHours(time_now.getHours()-1);
        try {
            const farm_list = await farm.findAll({raw : true});
            for (const iterator_farm of farm_list) {
                const sensor_list = await sensor.findAll({where: {FARM: iterator_farm.FARM}, attributes: ["MODULE"],raw : true});
                console.log(iterator_farm);
                let txtM  = "";
                for (const iterator_sensor of sensor_list) {
                    const values = await sensor_log.findAll({where:{MODULE:iterator_sensor.MODULE,TMST:{[Op.gt]:time_now}},order :[['IDX', 'DESC']],limit:1,raw : true});
                    if(values[0]){
                        let log_tmst = new Date(values[0].TMST);
                        log_tmst.setHours(log_tmst.getHours()+9)
                        txtM += `<smartItemList>
                                    <eqpmnCode>ES15</eqpmnCode><!--per hour-->
                                    <eqpmnEsntlSn></eqpmnEsntlSn>
                                    <eqpmnNo>${iterator_sensor.MODULE}</eqpmnNo>
                                    <itemCode>B00</itemCode><!--fixed-->
                                    <lsindRegistNo>${iterator_farm.USER_ID}</lsindRegistNo><!--farmID-->
                                    <makrId>yes99423</makrId><!--fixed-->
                                    <mesureDt>${iterator_farm.USER_ID}</mesureDt>
                                    <mesureVal01>${values[0].TEMP/100}</mesureVal01>
                                    <mesureVal02>${values[0].HUMI/100}</mesureVal02>
                                    <mesureVal03>${values[0].TEMP/100}</mesureVal03>
                                    <mesureVal04>${values[0].HUMI/100}</mesureVal04>
                                    <mesureVal05></mesureVal05>
                                    <mesureVal06></mesureVal06>
                                    <mesureVal07></mesureVal07>
                                    <mesureVal08></mesureVal08>
                                    <mesureVal09></mesureVal09>
                                    <mesureVal10></mesureVal10>
                                    <mesureVal11></mesureVal11>
                                    <mesureVal12></mesureVal12>
                                    <mesureVal13></mesureVal13>
                                    <mesureVal14></mesureVal14>
                                    <mesureVal15></mesureVal15>
                                    <roomDtlNo></roomDtlNo>
                                    <roomNo></roomNo>
                                    <stallNo>${iterator_sensor.MODULE}</stallNo>
                                    <stallTyCode>SB01</stallTyCode><!--fixed-->
                                </smartItemList>`
                    }
                }
                if(txtM  !=  ""){
                    const xmlBodyStr = txtH + txtM + txtE;
                    axios.post('https://smartfarmkorea.net/stockWs/webservices/SmartStockService', xmlBodyStr, config)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }                
            }
        } catch (error) {
            console.log("smartfarmkorea hourly send fail");
        }
    }else if(time_now.getHours() != time_day_h){
        time_day_h = time_now.getHours();
        if(time_day_h == 23){
            try {

            } catch (error) {
                console.log("smartfarmkorea daily send fail");
            }
        }
    } 
}, 1000*60);