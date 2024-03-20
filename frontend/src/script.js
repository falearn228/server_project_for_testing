const inputField = document.getElementById('inputField'); 
const pressButton = document.getElementById('pressButton');
inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        pressButton.click();
    }
});

function sendCommandToBackend() {
    const inputField = document.getElementById("inputField");
    const command = inputField.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/process', true);
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