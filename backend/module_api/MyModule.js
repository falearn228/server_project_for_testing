const { spawn } = require('child_process');
const commands = {
    'Длительность теста': ' set duration',
    // и типа того
};
class MyModule {
    constructor() {

    }

    async processInput(command, args) {
        const childProcess = spawn(command, args);
        let output = '';

        childProcess.stdout.on('data', data => {
            output += data.toString();
        });

        childProcess.stderr.on('data', data => {
            console.error(`Ошибка выполнения команды: ${data}`);
        });

        return new Promise((resolve, reject) => {
            childProcess.on('close', () => {
                resolve(output.trim());
            });

            childProcess.on('error', error => {
                reject(error);
            });
        });
    }
}

module.exports = MyModule;