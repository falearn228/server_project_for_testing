const { spawn } = require('child_process');

let ssh;
let output = '';

function connectSSH() {
    ssh = spawn('sshpass', ['-pPleaseChangeTheAdminPassword', 'ssh', '-L', '2222:localhost:22','admin@172.16.17.32']);

    ssh.stdout.on('data', (data) => {
        console.log(`Output:\n${data}`);
        output += data.toString();
    });

    ssh.stderr.on('data', (data) => {
        console.error(`Error:\n${data}`);
    });

    ssh.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
}

function sendCommand(command) {
    if (!ssh) {
        console.error('SSH connection is not established');
        return;
    }
    ssh.stdin.write(command + '\n');
}

function getOutput() {
    let toOut = output;
    output = '';
    return toOut;
}
// connectSSH();

// sendCommand('show version');
// sendCommand('exit')

module.exports = {
    connectSSH,
    sendCommand,
    getOutput
}

//sshpass -pPleaseChangeTheAdminPassword ssh -L 3000:localhost:22 admin@172.16.17.32
//('sshpass', ['-pPleaseChangeTheAdminPassword', 'ssh', '-L', '3000:localhost:22','admin@172.16.17.32', command])