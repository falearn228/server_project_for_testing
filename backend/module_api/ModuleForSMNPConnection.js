const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  host: '172.16.17.220',
  port: 161, // порт SNMP-агента на устройстве
};

const oid = '1.3.6.1.4.1.19707.7.7.2.1.4.18.0';
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
});

var MyVarbinds = [
  {
      oid: "1.3.6.1.4.1.19707.7.7.2.1.4.18.0",
      type: snmp.ObjectType.Integer32,
      value: 1
  }
];

session.set (MyVarbinds, function (error, varbinds) {//maybe dont work
  if (error) {
      console.error (error.toString ());
  } else {
      for (var i = 0; i < MyVarbinds.length; i++) {
          if (snmp.isVarbindError (MyVarbinds[i]))
              console.error (snmp.varbindError (MyVarbinds[i]));
          else
              console.log (MyVarbinds[i].oid + "|" + MyVarbinds[i].value);
      }
  }
});

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
