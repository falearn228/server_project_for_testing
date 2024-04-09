const serialport = require('serialport');
var serialPort = serialport.SerialPort;

const port = new serialPort( {
    path: '/dev/ttyACM0',
    baudRate: 115200,
})

port.write('INP:ATT 80\n')

port.write('INP:ATT?\n')

port.on('data', function (data) {
    console.log('Data:', parseInt(data))
})

port.on('error', function(err) {
    console.log('Error: ', err.message)
})