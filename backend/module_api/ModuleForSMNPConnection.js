const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  host: '172.16.17.220',
};

var MyVarbinds = [//example of structre
  {
      oid: "",
      type: snmp.ObjectType.Integer32,
      value: 0
  }
];

function oidMaker(whatOid,Value)
{
  switch(whatOid)
  {
    case "Frequncy":
    {
      MyVarbinds.oid=""
      MyVarbinds.value=Value
      break
    }
    case "Width":
    {
      MyVarbinds.oid=""
      MyVarbinds.value=Value
      break
    }
    case "mode":
    {
      MyVarbinds.oid="1.3.6.1.4.1.19707.7.7.2.1.4.18.0"
      MyVarbinds.value=Value
      break
    }
  }
}

function setOid(oidToSet, value)
{
  oidMaker(oidToSet, value)
  const session = snmp.createSession(options.host);

  session.set (MyVarbinds, function (error, varbinds) {
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
    
    session.close();
  });
}

function getOid(oid)
{
  const session = snmp.createSession(options.host);

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
          session.close(); 
          return arbind.value.toString();
        }
      }
    }
    session.close();
    return "";
  });
}
module.exports = {
  setOid,
  getOid
};