const pressButton = document.getElementById('pressButton');


inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        pressButton.click();
    }
});

function sendCommandToBackend() {
    const inputField = document.getElementById("inputField");
    const selectedRegime = document.getElementById('selectionRegime');
    const selectedBandwidth = document.getElementById('selectionBandwidth');
    const frequency = inputField.value;
    const regime = selectedRegime.value;
    const bandwidth = selectedBandwidth.value;
    let InputedParams = [
        {
            oid: "Frequncy",
            value: frequency
        },
        {
            oid: "Mode",
            value: regime
        },
        {
            oid: "Width",
            value: bandwidth
        }
    ]

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/snmp/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            const responseBlock = document.getElementById("responseBlock");
            responseBlock.innerText = "Установленная частота: " + frequency + " KHz"
            + "\nУстановленный режим работы: " + regime + "\nУстановленная ширина полосы: " + bandwidth;
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify(InputedParams));
    inputField.value = "";
}