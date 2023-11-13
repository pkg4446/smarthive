const axios     = require('axios');

                
ITServerPost = setInterval(function() {
    const txtH = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:smar="http://smart.webservice.itis.epis.org/">
                <soapenv:Header/>
                <soapenv:Body>
                <smar:sendSmartMessage>
                <arg0>`;
    const txtE = `</arg0>
                </smar:sendSmartMessage>
                </soapenv:Body>
                </soapenv:Envelope>`;

    /***************************************************/
    /***************************************************/
    

    let txtM  = `<smartItemList>
                    <eqpmnCode>?</eqpmnCode>
                    <eqpmnEsntlSn>?</eqpmnEsntlSn>
                    <eqpmnNo>?</eqpmnNo>
                    <itemCode>?</itemCode>
                    <lsindRegistNo>?</lsindRegistNo>
                    <makrId>?</makrId>
                    <mesureDt>?</mesureDt>
                    <mesureVal01>?</mesureVal01>
                    <mesureVal02>?</mesureVal02>
                    <mesureVal03>?</mesureVal03>
                    <mesureVal04>?</mesureVal04>
                    <mesureVal05>?</mesureVal05>
                    <mesureVal06>?</mesureVal06>
                    <mesureVal07>?</mesureVal07>
                    <mesureVal08>?</mesureVal08>
                    <mesureVal09>?</mesureVal09>
                    <mesureVal10>?</mesureVal10>
                    <mesureVal11>?</mesureVal11>
                    <mesureVal12>?</mesureVal12>
                    <mesureVal13>?</mesureVal13>
                    <mesureVal14>?</mesureVal14>
                    <mesureVal15>?</mesureVal15>
                    <roomDtlNo>?</roomDtlNo>
                    <roomNo>?</roomNo>
                    <stallNo>?</stallNo>
                    <stallTyCode>?</stallTyCode>
                </smartItemList>`
    ////
    let config = {
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            SOAPAction:""
            }
    };
    let xmlBodyStr = txtH + txtM + txtE;
    axios.post('https://smartfarmkorea.net/stockWs/webservices/SmartStockService', xmlBodyStr, config)
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error);
    });
    /***************************************************/
    /***************************************************/

    /*
    library.hiveUpload().then((value) => {
        let   txtM =    "";
        if(value.length != 0){
            for(let i=0; i<value.length; i++){
                txtM += '<smartItemList>'+
                        '<eqpmnCode>'   + value[i]['Device.EQPMN_CODE'] + '</eqpmnCode>' +
                        '<eqpmnEsntlSn>'+ value[i].EQPMN_ESNTL_SN + '</eqpmnEsntlSn>' +
                        '<eqpmnNo>'     + value[i]['Device.EQPMN_NO'] + '</eqpmnNo>' +
                        '<itemCode>'    + value[i]['Device.ITEM_CODE'] + '</itemCode>' +
                        '<lsindRegistNo>' + value[i].NO + ' </lsindRegistNo>' +
                        '<makrId>'      + value[i]['Device.MAKR_ID'] + '</makrId>' +          
                        '<mesureDt>'    + value[i].MESURE_DT + '</mesureDt>' +
                        '<mesureVal01>' + value[i].MESURE_VAL_01 + '</mesureVal01>' +
                        '<mesureVal02>' + value[i].MESURE_VAL_02 + '</mesureVal02>' +
                        '<mesureVal03>' + value[i].MESURE_VAL_03 + '</mesureVal03>' +
                        '<mesureVal04>' + value[i].MESURE_VAL_04 + '</mesureVal04>' +
                        '<roomDtlNo>'   + value[i]['Device.ROOM_DTL_NO'] + '</roomDtlNo>' +
                        '<roomNo>'      + value[i]['Device.ROOM_NO'] + '</roomNo>' +
                        '<stallNo>'     + value[i]['Device.STALL_NO'] + '</stallNo>' +
                        '<stallTyCode>' + value[i]['Device.STALL_TY_CODE'] + '</stallTyCode>' +
                        '</smartItemList>'
            }
            ////
            let config = {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    SOAPAction:""
                    }
            };
            let xmlBodyStr = txtH + txtM + txtE;
            axios.post('https://smartfarmkorea.net/stockWs/webservices/SmartStockService', xmlBodyStr, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
            ////
        }
    });
    */
  }, 1000*60*10);