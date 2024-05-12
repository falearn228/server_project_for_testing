const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  subIp: '172.16.17.84',
  baseIp: '172.16.17.173'
};

function setIp(newSub, newBase){
  options.subIp = newSub;
  options.baseIp = newBase;
}

function fetchSnmpData(ip, oid) {
    return new Promise((resolve, reject) => {
        const session = snmp.createSession(ip, "public"); // Адаптируйте community string по вашему случаю

        session.get([oid], (error, varbinds) => {
            if (error) {
                reject(error);
            } else {
                if (snmp.isVarbindError(varbinds[0])) {
                    reject(snmp.varbindError(varbinds[0]));
                } else {
                    resolve(varbinds[0].value);
                }
            }
            session.close();
        });
    });
}

// Асинхронная функция для использования fetchSnmpData
async function getSnmpData() {
    const ip = options.subIp; // Ваш IP-адрес
    const oid = "1.3.6.1.4.1.19707.7.7.2.1.3.9.0"; // Ваш OID

    try {
        const snmpData = await fetchSnmpData(ip, oid);
        console.log("Received value:", snmpData.toString());
        // Теперь переменная snmpData содержит значение, полученное по SNMP
        return snmpData.toString();
    } catch (error) {
        console.error("Error fetching SNMP ", error);
        return null; // Возвращаем null в случае ошибки
    }
}

async function monitorSnmpData(targetValue, attModule, attValue, ip=options.subIp, oid="1.3.6.1.4.1.19707.7.7.2.1.3.9.0") {
  return new Promise(async (resolve, reject) => {  
    let x = await fetchSnmpData(ip, oid);
    if(x.toString() != targetValue.toString()){
      console.log(x.toString())
      console.log(targetValue.toString())
      attModule.setAttenuatorValue(attValue-2);
      sleep(2000);
      attModule.setAttenuatorValue(attValue-1);
      sleep(2000);
      attModule.setAttenuatorValue(attValue);
      sleep(2000);
    }
    x = await fetchSnmpData(ip, oid);
    if(x.toString() == targetValue.toString()){
      resolve(1);
    }
    else{
      resolve(0);
    }
  })
}

// // Пример использования:
// const oid = "1.3.6.1.4.1.19707.7.7.2.1.3.9.0"; // Замените на ваш OID

// fetchSnmpData(options.subIp, oid)
//     .then(value => {
//         console.log("Received value:", value.toString());
//     })
//     .catch(error => {
//         console.error("Error")

// });

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}


module.exports = {
  monitorSnmpData,
};