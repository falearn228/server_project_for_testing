const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  hostTest: '172.16.17.220',
  hostPlay: '172.16.17.79'
};

var varbinds= //example of structre
[{
    oid: "",
    type: snmp.ObjectType.Integer,
    value: 0
}];

function oidMaker(whatOid, Value)
{
  switch(whatOid)
  {
    case "Frequncy":
    {
      varbinds[0].oid="1.3.6.1.4.1.19707.7.7.2.1.4.58.0"
      varbinds[0].value=Value
      break
    }
    case "Width":
    {
      varbinds[0].oid="1.3.6.1.4.1.19707.7.7.2.1.4.56.0"
      varbinds[0].value=Value
      break
    }
    case "Mode":
    {
      varbinds[0].oid="1.3.6.1.4.1.19707.7.7.2.1.4.18.0"
      varbinds[0].value=Value
      break
    }
    default:
    {
      varbinds.oid=""
      varbinds.value=0
    }
  }
}

function setOid(oidToSet, value, isItTestingStation=true)
function setOid(oidToSet, value, isItTestingStation=true)
{
  oidMaker(oidToSet, value)
  if(varbinds.oid=="")
  {
    return "Can't set oid. Invalid Oid";
  }

  if(isItTestingStation)
  {
    const session = snmp.createSession(options.hostTest);
  }
  else
  {
    const session = snmp.createSession(options.hostPlay)
  }  

  if(isItTestingStation)
  {
    const session = snmp.createSession(options.hostTest);
  }
  else
  {
    const session = snmp.createSession(options.hostPlay)
  }  

  session.set(varbinds, function (error, varbinds) {
    if (error) {
        console.error(error.toString());
    } else {
        // Проверяем, были ли переменные установлены успешно
        for (let i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i]))
                console.error(snmp.varbindError(varbinds[i]));
            else
                console.log("Установлено: " + varbinds[i].oid + " = " + varbinds[i].value);
        }
    }
    
    session.close();
  });
}

function getOid(oid,isItTestingStation=true)//maybe We need to change it// What if we will need to set many oid in one time
function getOid(oid,isItTestingStation=true)//maybe We need to change it// What if we will need to set many oid in one time
{
  switch(whatOid)
  {
    case "Frequncy":
    {
      oid="1.3.6.1.4.1.19707.7.7.2.1.4.58.0"
      break
    }
    case "Width":
    {
      oid="1.3.6.1.4.1.19707.7.7.2.1.4.56.0"
      break
    }
    case "Mode":
    {
      oid="1.3.6.1.4.1.19707.7.7.2.1.4.18.0"
      break
    }
    default:
    {
      return "Can't get oid. Invalid OID"
    }
  }
  
  if(isItTestingStation)
  {
    const session = snmp.createSession(options.hostTest);
  }
  else
  {
    const session = snmp.createSession(options.hostPlay)
  }  
  
  if(isItTestingStation)
  {
    const session = snmp.createSession(options.hostTest);
  }
  else
  {
    const session = snmp.createSession(options.hostPlay)
  }  

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
          return varbind.value.toString();
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