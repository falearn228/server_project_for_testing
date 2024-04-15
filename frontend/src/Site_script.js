function openModalID(ModalID) {
  document.getElementById(ModalID).style.display = "block";
}

function closeModalID(ModalID) {
  document.getElementById(ModalID).style.display = "none";
}

 let inputField = document.getElementById('inputField'); 
 const pressButton = document.getElementById('pressButton');
 const disconnectButton = document.getElementById('disconnectButton');
 const connectButton = document.getElementById('connectButton');
 const pressButton_display = document.getElementById("pressButton");

function connect() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/site/bert/connect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            connectButton.style.display = 'none';
            pressButton_display.style.display = 'flex';
            disconnectButton.style.display = 'flex';
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
    xhr.open('GET', '/site/bert/disconnect', true);
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

function sendCommandToBackend() {
    const inputField = document.getElementById("inputField");
    const command = inputField.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/site/bert/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            const responseBlock = document.getElementById("responseBlock");
            responseBlock.innerText = xhr.response;
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify({ command: command }));
    // inputField.value = "";
}

function sendStat1() {
    const inputFrequency1 = document.getElementById("inputFrequency1");
    const selectedRegime1 = document.getElementById('selectionRegime1');
    const selectedBandwidth1 = document.getElementById('selectionBandwidth1');
    let frequency = inputFrequency1.value;
    let regime = selectedRegime1.value;
    let bandwidth = selectedBandwidth1.value;
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
    xhr.open('POST', '/site/snmp/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify(InputedParams));
}

function sendStat2() {
    const inputFrequency2 = document.getElementById("inputFrequency1");
    const selectedRegime2 = document.getElementById('selectionRegime1');
    const selectedBandwidth2 = document.getElementById('selectionBandwidth1');
    let frequency = inputFrequency2.value;
    let regime = selectedRegime2.value;
    let bandwidth = selectedBandwidth2.value;
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
    xhr.open('POST', '/site/snmp/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify(InputedParams));
}

function sendAtt() {
    const inputAtt = document.getElementById("inputAtt");
    let Att = inputAtt.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/site/att', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };

    xhr.send(JSON.stringify({Att: Att}));
}

function getOutputPower() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/site/M3M/output-power', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      const outputPowerValue = document.getElementById('outputPowerValue');
      outputPowerValue.textContent = response.value + " дБ";
    } else {
      console.error('Ошибка получения значения мощности:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('Ошибка получения значения мощности:', xhr.status);
  };

  xhr.send();
}
