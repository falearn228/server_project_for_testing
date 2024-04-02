const express = require('express');
const bodyParser = require('body-parser');
const MyModule = require('../module_api/MyModule');
const berkutModule = require('../module_api/test');
const snmpModule = require('../module_api/ModuleForSMNPConnection');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const frontPath = path.join(__dirname + '../../../frontend');
app.use(express.static('/fontend/public'));


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

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});
