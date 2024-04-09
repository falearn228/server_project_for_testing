const serialport = require('serialport');
var serialPort = serialport.SerialPort;

const port = new serialPort( {
    path: '/dev/ttyACM0',
    baudRate: 115200,
})

port.write('SYST:CONF:IP 172.16.17.56\n')
port.write('SYST:CONF:IP?\n')
port.on('data', function (data) {
    console.log('Data:', parseInt(data))
})

port.on('error', function(err) {
    console.log('Error: ', err.message)
})