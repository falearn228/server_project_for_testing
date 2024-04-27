const { spawn } = require('child_process');

let sshProcess;
let output = '';

function connectSSH() {
    const command = 'sshpass -p PleaseChangeTheAdminPassword ssh -T -L 2222:localhost:22 admin@172.16.17.32';

    sshProcess = spawn(command, {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    sshProcess.stdout.once('data', (data) => {
        output += data.toString();
        console.log('Current output:', output);
    });

    sshProcess.stderr.on('data', (data) => {
        console.error(`Error:\n${data}`);
    });

    sshProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
}

function sendCommand(command) {
    if (!sshProcess) {
        console.error('SSH connection is not established');
        return Promise.reject('SSH connection is not established');
    }
    
    return new Promise((resolve, reject) => {
        output = ''; // Очищаем вывод перед отправкой новой команды
        
        sshProcess.stdin.write(command + '\n');
        
        sshProcess.stdout.once('data', (data) => {
            output += data.toString();
            console.log('Current output:', output);
            resolve(output);
        });

        sshProcess.stderr.once('data', (data) => {
            console.error(`Error:\n${data}`);
            reject(data);
        });
    });
}

function getOutput() {
    let toOut = output;
    output = ''; // Очищаем вывод после получения результата
    return toOut;
}

module.exports = {
    connectSSH,
    sendCommand,
    getOutput
};