const { SerialPort } = require('serialport')

const port = new SerialPort( {
            path: '/dev/ttyUSB0',
            baudRate: 19300,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
        });

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
// Функция для чтения ответа от устройства
function readResponse(port) {
  return new Promise((resolve, reject) => {
    let deviceResponse;
    port.on('data', (data) => {
      deviceResponse = parseFloat(data);
      while(!deviceResponse){
        sleep(1000)
      }
      resolve(deviceResponse)
    });

    port.on('error', (err) => {
      reject(err);
    });
  });
}

async function setOffset(offset){
    try{
        buf = new Uint8Array(3);
        buf[0] = 65;
        buf[1] = 84;
        buf[2] = offset;
        port.write(buf);
        sleep(500);
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }

    
}

// Основная функция для отправки команды, чтения ответа и вывода результата
async function getMainValue() {
  // const port = new SerialPort( {
  //       path: '/dev/ttyUSB0',
  //       baudRate: 19300,
  //       dataBits: 8,
  //       stopBits: 1,
  //       parity: 'none',
  //   });

  try {
    buf = new Uint8Array(1);
    buf[0] = 0;
    port.write(buf);
    const response = await readResponse(port);
    return response;
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

module.exports = {
    setOffset,
    getMainValue,
}