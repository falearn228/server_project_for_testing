const inputField = document.getElementById('inputField'); 
const pressButton = document.getElementById('pressButton');
const container = document.querySelector('.container');
const connectButton = document.querySelector('#connectButton');

function connect() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/bert/connect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            connectButton.style.display = 'none';
            container.style.display = 'flex';
            console.log("Статус отключения: ",xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса подключения: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send();
}

function disconnect() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/bert/disconnect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            container.style.display = 'none';
            connectButton.style.display = 'flex';
            console.log("Статус подключения: ", xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса отключения: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send();
}



inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && container.style.display != 'none') {
        event.preventDefault();
        pressButton.click();
    }
});

function sendCommandToBackend() {
    const inputField = document.getElementById("inputField");
    const command = inputField.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/bert/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            //const response = JSON.parse(xhr.response);
            const responseBlock = document.getElementById("responseBlock");
            //responseBlock.innerText = response.command;
            responseBlock.innerText = xhr.response;
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify({ command: command }));
    inputField.value = "";
}
