const net = require('net');
let client;
const output;

function connectATT() {
    // Устанавливаем параметры подключения
    const HOST = '169.254.0.160'; // IP-адрес или хостнейм вашего устройства
    const PORT = 5025; // Порт вашего устройства
    client = new net.Socket();
    // Создаем экземпляр сокета TCP
    client.connect(PORT, HOST, function() {
      // Отправляем запрос *IDN? на устройство
      // client.write(':INP:ATT?\n');
    });
    client.on('data', function(data) {
        output = data;
    });

    // Обработчик события в случае разрыва соединения
    client.on('close', function() {
      console.log('Соединение с устройством закрыто');
    });

    // Обработчик события в случае ошибки подключения
    client.on('error', function(err) {
      console.error('Ошибка при подключении к устройству:', err);
    });

}

function destroyATT() {
    client.end();
}

function getAttenuatorValue() {
    client.write(':INP:ATT?\n');
    return parseInt(output).toString();
}

function setAttenuatorValue(attValue) {
    client.write(`:INP:ATT ${attValue.toString()}\n`);
}


connectATT();
setAttenuatorValue(25);
console.log(getAttenuatorValue())
// destroyATT();

module.exports = {
    connectATT,
    getAttenuatorValue,
    setAttenuatorValue,
    destroyATT,
};
