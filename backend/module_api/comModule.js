const serialport = require('serialport');
var serialPort = serialport.SerialPort;

const port = new serialPort( {
    path: '/dev/ttyUSB0',
    baudRate: 19300,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
})

buf = new Uint8Array(1)
//uc_RxBUFF = new Uint8Array(6)


buf[0] = 0
//buf[1] = 84
//buf[2] = 0

port.write(buf)

port.on('data', function (data) {
    console.log('Data:', data, typeof(data), parseFloat(data))
    if (data[0] == 0){
        f_FreqCorr = 0.1
    }
    else{
        f_FreqCorr = 0.5 * data[0];
    }
})

//обработчик для null