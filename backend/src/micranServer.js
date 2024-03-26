const express = require('express');
const bodyParser = require('body-parser');
const MyModule = require('../module_api/MyModule');
const berkutModule = require('../module_api/test');
const path = require('path');
const { setTimeout } = require('timers/promises');


const myModule = new MyModule();
const app = express();
const port = 3001;

berkutModule.connectSSH();

// const host = '172.16.17.32';
// const username = 'admin';
// const password = 'PleaseChangeTheAdminPassword';
// const command = 'show version';

// sshModule.multiplexCommands(host, username, password, command);

app.use(bodyParser.json());
const frontPath = path.join(__dirname + '../../../frontend');
app.use(express.static('/fontend/public'));

// Обработка запроса от клиента
app.post('/process', async (req, res) => {
  // Получаем данные от клиента
    // const [command, ...args] = req.body.command.split(' ');

    // // Вызываем метод processInput и ждем его завершения
    // myModule.processInput(command, args)
    // .then(result => {
    //   console.log(result);
    //   res.send(result)
    // })
    // .catch(error => {
    //   console.error(error)
    //   res.status(500).send('Iternal server error')
    // });
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

app.get("/", (req, res) =>{
    res.sendFile("/ConsoleComandsWebTest.html", {root: path.join(frontPath, 'public')});
});

app.get("/styles.css", (req, res) =>{
  res.sendFile("/styles.css", {root: path.join(frontPath, 'styles')});
});

app.get("/script.js", (req, res) =>{
  res.sendFile("/script.js", {root: path.join(frontPath, 'src')});
});

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}