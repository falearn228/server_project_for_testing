const express = require('express');
const bodyParser = require('body-parser');
const MyModule = require('./MyModule');


const myModule = new MyModule();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Обработка запроса от клиента
app.post('/process', (req, res) => {
  // Получаем данные от клиента
    const [command, ...args] = req.body.command.split(' ');

    // Вызываем метод processInput и ждем его завершения
    myModule.processInput(command, args)
    .then(result => {
      console.log(result);
      res.send(result)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Iternal server error')
    });
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/ConsoleComandsWebTest.html");
});

app.get("/script.js", (req, res) =>{
    res.sendFile(__dirname + "/script.js");
});

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});