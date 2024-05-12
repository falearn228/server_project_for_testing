const express = require('express');
const bodyParser = require('body-parser');
const berkutModule = require('../module_api/test');
const snmpModule = require('../module_api/ModuleForSMNPConnection');
const attModule = require('../module_api/AttTCPModule');
const m3mModule = require('../module_api/comModule');
const expressTestModule = require('../module_api/express_test');
const path = require('path');
const XLSX = require('xlsx');
//da
const app = express();
const port = 3000;

app.use(bodyParser.json());
const frontPath = path.join(__dirname + '../../../frontend');
app.use(express.static('/frontend/public'));

//Express test

// app.post('/Test/Attenuation', async (req, res) =>{
//   try{
//     expressTestModule.setValues(
//       req.body[0].pa1,
//       req.body[0].pa1,
//       req.body[1].v1,
//       req.body[1].v2,
//       req.body[2].c1,
//       req.body[2].c2,
//       req.body[2].c3
//     );
//     await berkutModule.sendCommand('bert start');
//     expressTestModule.setModulation(req.body[3].val);
//     m3mModule.getMainValue().then(data =>{
//       expressTestModule.setM3M(data); 
//       const x = expressTestModule.calcM3M();
//       const y = expressTestModule.calcBaseAtt();
//       const z = expressTestModule.calcMainAtt();
//       berkutModule.sendCommand('bert stop');
//       res.status(200).json([x, y, z]); 
//     });
//   } catch {
//     console.error('Error', error);
//     res.status(500).send('Error occurred');
//   }
// });

app.post('/Test/EXPRESS_TEST', async (req, res) =>{
  try{
    expressTestModule.setValues(
      req.body[0].pa1,
      req.body[0].pa1,
      req.body[1].v1,
      req.body[1].v2,
      req.body[2].c1,
      req.body[2].c2,
      req.body[2].c3
    );
    // const speed = expressTestModule.getSpeed();
    // console.log(speed);
    // await berkutModule.sendCommand(`configure; bert rate ${getSpeed()} kbps; exit`);
    const comp = expressTestModule.calcM3M();
    m3mModule.setOffset(comp);
    const speed = [
      1600,
      3500,
      5250,
      7000,
      10500,
      14500,
      16500
    ];
    let excelData = [['Модуляция', 'Bits', 'Ebits', 'Процент ошибок']];
    for(let i = 6; i >= 0; i--){
      await berkutModule.sendCommand(`configure`);
      // const speed = await expressTestModule.getSpeed(i);
      await berkutModule.sendCommand(`bert rate ${speed[i].toString()} kbps`);
      await berkutModule.sendCommand(`exit`);
      await berkutModule.sendCommand('bert start');
      sleep(1000);
      const m3m = await m3mModule.getMainValue();
      console.log(m3m)
      await expressTestModule.setM3M(m3m);
      const modAtt = await expressTestModule.calcMainAtt(i);
      console.log(modAtt+6)
      await berkutModule.sendCommand('bert stop');

      // const modAtt = await expressTestModule.getMainModulations(i);
      await attModule.setAttenuatorValue(modAtt+6);
      sleep(1000);
      const result = await snmpModule.monitorSnmpData(i, attModule, modAtt + 6);
      if(result){
        await berkutModule.sendCommand('bert start');
        let bits_ebits;
        for (let i = 0; i < 5; i++) {
          await berkutModule.sendCommand('show bert trial');
          sleep(1000)
          const output = berkutModule.getOutput();
          bits_ebits = await expressTestModule.parseBits(output);
          sleep(2000)
          console.log('bits_Ebits: ',bits_ebits.bits, bits_ebits.ebits);
          sleep(3000);
        }
        await berkutModule.sendCommand('bert stop');
        const errorRate = (bits_ebits.ebits / (bits_ebits.ebits + bits_ebits.bits)) * 100;
        excelData.push([expressTestModule.mod_name[i], bits_ebits.bits, bits_ebits.ebits, errorRate.toFixed(2)]);
      }
      sleep(1000);
    }
    // attModule.setAttenuatorValue(x);
    // snmpModule.monitorSnmpData(i, attModule, x);
    function writeDataToExcel(data) {
      const ws = XLSX.utils.aoa_to_sheet(data); // Преобразуем массив данных в лист Excel
      const wb = XLSX.utils.book_new(); // Создаем новую книгу
      XLSX.utils.book_append_sheet(wb, ws, 'Результаты'); // Добавляем лист в книгу
      XLSX.writeFile(wb, 'result_express_test.xlsx'); // Записываем книгу в файл
    }
    writeDataToExcel(excelData);
    res.status(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }
});

//Express test

//ATT модуль
app.post('/att/setValue', (req, res) => {
  try{
    const attValue = req.body.value;
    attModule.setAttenuatorValue(attValue);
    res.status(200).send(attValue);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }
    
});

app.get('/att/connect', (req, res) => {
  try{
    attModule.connectATT();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }

});

app.get('/att/getValue', (req, res) => {
  res.status(200).send(attModule.getAttenuatorValue());
});

app.get('/att/disconnect', (req, res) => {
  try{
    attModule.destroyATT();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }

});


//ATT модуль

//M3M модуль

app.post('/M3M/setValue', (req, res) =>{
  const m3mValue = req.body.value;
  try{
    m3mModule.setOffset(m3mValue);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }

});

app.get('/M3M/connect', (req, res) =>{
  res.sendStatus(200);
});

app.get('/M3M/disconnect', (req, res) =>{
  res.sendStatus(200);
});

//M3M модуль

//SNMP модуль
app.post('/snmp/process', (req, res) =>{
  const [freq, mode, width, ipp] = req.body;
  // console.log(req.body)
  // console.log(mode.oid, mode.value);
  if(ipp)
  {
    snmpModule.getOid(mode.oid);
    snmpModule.setOid(mode.oid, parseInt(mode.value));
    //snmpModule.setMode();
    snmpModule.getOid(mode.oid);
  }
  else
  {
    snmpModule.getOid(mode.oid, false);
    snmpModule.setOid(mode.oid, parseInt(mode.value), false);
    //snmpModule.setMode();
    snmpModule.getOid(mode.oid, false);
  }

  res.status(200).send("OID's OK")
});
//SNMP модуль

//Беркут модуль
app.post('/bert/process', async (req, res) => {
  const command = req.body.command;
try{
  await berkutModule.sendCommand(command);
  const output = berkutModule.getOutput();
  res.send(output);
} catch (error) {
  console.error('Error', error);
  res.status(500).send('Error occurred');
}

});

app.get('/bert/connect', (req, res) => {
  berkutModule.connectSSH();
  try{

    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }
});

app.get('/bert/disconnect', async (req, res) => {
  const command = 'exit';
  try{
  await berkutModule.sendCommand(command);
  const output = berkutModule.getOutput();
  res.sendStatus(200);
  } catch (error) {
  console.error('Error', error);
  res.status(500).send('Error occurred');
  }

});
//Беркут модуль


//Основа сайта
app.get("", (req, res) =>{
  res.sendFile("/Site.html", {root: path.join(frontPath, 'public')});
});

app.get("/Site_styles.css", (req, res) =>{
  res.sendFile("/Site_styles.css", {root: path.join(frontPath, 'styles')});
});

app.get("/Site_script.js", (req, res) =>{
  res.sendFile("/Site_script.js", {root: path.join(frontPath, 'src')});
});

app.get("/18c04e70df67915d324cd6e02dac19c0.png", (req, res) =>{
  res.sendFile("/18c04e70df67915d324cd6e02dac19c0.png", {root: path.join(frontPath, 'public')});
});
//Основа сайта

/*
// начало SNMP модуль

app.post('/snmp/process', (req, res) =>{
  const [freq, mode, width] = req.body;
  console.log(mode.oid, mode.value);
  snmpModule.getOid(mode.oid);
  snmpModule.setOid(mode.oid, parseInt(mode.value));
  //snmpModule.setMode();
  snmpModule.getOid(mode.oid);
});

app.get("/snmp", (req, res) =>{
  res.sendFile("/StationTest.html", {root: path.join(frontPath, 'public')});
});

app.get("/StationStyles.css", (req, res) =>{
  res.sendFile("/StationStyles.css", {root: path.join(frontPath, 'styles')});
});

app.get("/StationScript.js", (req, res) =>{
  res.sendFile("/StationScript.js", {root: path.join(frontPath, 'src')});
});

app.get("/18c04e70df67915d324cd6e02dac19c0.png", (req, res) =>{
  res.sendFile("/18c04e70df67915d324cd6e02dac19c0.png", {root: path.join(frontPath, 'public')});
});

// Конец SNMP модуля

// Начало беркут модуль
app.post('/bert/process', async (req, res) => {
      const command = req.body.command;
    try{
      await berkutModule.sendCommand(command);
      const output = berkutModule.getOutput();
      res.send(output);
    } catch (error) {
      console.error('Error', error);
      res.status(500).send('Error occurred');
    }
    
});

app.get('/bert/connect', (req, res) => {
  berkutModule.connectSSH();
  res.sendStatus(200);
});

app.get('/bert/disconnect', async (req, res) => {
  const command = 'exit';
  try{
    await berkutModule.sendCommand(command);
    const output = berkutModule.getOutput();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error occurred');
  }

});

app.get("/bert", (req, res) =>{
    res.sendFile("/ConsoleComandsWebTestIMPROVED.html", {root: path.join(frontPath, 'public')});
});

app.get("/stylesIMPROVED.css", (req, res) =>{
  res.sendFile("/stylesIMPROVED.css", {root: path.join(frontPath, 'styles')});
});

app.get("/scriptIMPROVED.js", (req, res) =>{
  res.sendFile("/scriptIMPROVED.js", {root: path.join(frontPath, 'src')});
});
// Конец беркут модуля
*/
app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});


function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
