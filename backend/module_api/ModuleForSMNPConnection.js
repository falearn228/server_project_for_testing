const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  host: '172.16.17.220',
  port: 161, // порт SNMP-агента на устройстве
};

const oid = '1.3.6.1.4.1.19707.7.7.1.4.18.0';

// Установка соединения с устройством
const session = snmp.createSession(options.host);

// Отправка запроса на чтение значения OID
session.get([oid], function (error, varbinds) {
  if (error) {
    console.error('Ошибка при чтении OID:', error);
  } else {
    for (const varbind of varbinds) {
      if (snmp.isVarbindError(varbind)) {
        console.error('Ошибка в varbind:', varbind);
      } else {
        console.log('OID:', varbind.oid);
        console.log('Значение:', varbind.value.toString());
      }
    }
  }
  
  session.close();
});