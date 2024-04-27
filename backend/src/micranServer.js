const express = require('express');
const bodyParser = require('body-parser');
const berkutModule = require('../module_api/test');
const snmpModule = require('../module_api/ModuleForSMNPConnection');
const attModule = require('../module_api/AttTCPModule');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const frontPath = path.join(__dirname + '../../../frontend');
app.use(express.static('/frontend/public'));

//ATT модуль
app.post('/att/setValue', (req, res) => {
  const attValue = req.body.value;
  attModule.setAttenuatorValue(attValue);
  
  res.status(200).send(attModule.getAttenuatorValue());
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

//M3M модуль

//SNMP модуль
app.post('/snmp/process', (req, res) =>{
  const [freq, mode, width, ipp] = req.body;
  console.log(req.body)
  console.log(mode.oid, mode.value);
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
  console.log(command)
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
