const snmp = require('net-snmp');

// Настройки для подключения к устройству
const options = {
  host: '172.16.17.220',
};

var MyVarbind= //example of structre
{
    oid: "",
    type: snmp.ObjectType.Integer32,
    value: 0
};

function oidMaker(whatOid,Value)
{
  switch(whatOid)
  {
    case "Frequncy":
    {
      MyVarbind.oid=""
      MyVarbind.value=Value
      break
    }
    case "Width":
    {
      MyVarbind.oid=""
      MyVarbind.value=Value
      break
    }
    case "mode":
    {
      MyVarbind.oid="1.3.6.1.4.1.19707.7.7.2.1.4.18.0"
      MyVarbind.value=Value
      break
    }
    default:
    {
      MyVarbind.oid=""
      MyVarbind.value=0
    }
  }
}

function setOid(oidToSet, value)
{
  oidMaker(oidToSet, value)
  if(MyVarbind.oid=="")
  {
    return "Can't set oid. Invalid Oid";
  }
    
  const session = snmp.createSession(options.host);

  session.set (MyVarbind, function (error, varbinds) {
    if (error) 
    {
        console.error (error.toString ());
    }
    else
    {
      if (snmp.isVarbindError (MyVarbind))
          console.error (snmp.varbindError (MyVarbind));
      else
          console.log (MyVarbind.oid + "|" + MyVarbind.value);
    }
    
    session.close();
  });
}

function getOid(oid)//maybe We need to change it// What if we will need to set many oid in one time
{
  switch(whatOid)
  {
    case "Frequncy":
    {
      oid=""
      break
    }
    case "Width":
    {
      oid=""
      break
    }
    case "mode":
    {
      oid="1.3.6.1.4.1.19707.7.7.2.1.4.18.0"
      break
    }
    default:
    {
      return "Can't get oid. Invalid OID"
    }
  }
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