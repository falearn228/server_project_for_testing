function openModalID(ModalID) {
  document.getElementById(ModalID).style.display = "block";
}

function closeModalID(ModalID) {
  document.getElementById(ModalID).style.display = "none";
}

 let inputField = document.getElementById('inputField'); 
 const disconnectButtonBercut = document.getElementById('disconnectButtonBercut');
 const connectButtonBercut = document.getElementById('connectButtonBercut');
 const pressButtonBercut_display = document.getElementById("pressButtonBercut");

connectionSwitch.addEventListener('change', function() {
  if (this.checked) {
    connectionType.textContent = 'Ethernet';
    console.log('Выбрано подключение через Ethernet');
  } else {
    connectionType.textContent = 'COM-port';
    console.log('Выбрано подключение через COM-port');
  }
});

function connectAtt() {
  const indicatorCircle = document.querySelector('.indicator-circle');
  const connectionStatus = document.querySelector('.connection-status');
  const connectButtonAtt = document.getElementById('connectButtonAtt');
  const connectionSwitch = document.getElementById('connectionSwitch');
  const connectionType = document.getElementById('connectionType');
  const xhr = new XMLHttpRequest();

  const selectedConnectionType = connectionType.textContent;
  const url = `/api/connection-status${selectedConnectionType}`;

  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        if (connectionType.textContent == 'Ethernet') {
        indicatorCircle.style.backgroundColor = '#28a745;';
        connectionStatus.textContent = 'Подключено';
        connectionSwitch.disabled = true;
        connectButtonAtt.display = 'none';
      } else if (connectionType.textContent == 'COM-port') {
        indicatorCircle.style.backgroundColor = '#28a745;';
        connectionStatus.textContent = 'Подключено';
        connectionSwitch.disabled = true;
        connectButtonAtt.display = 'none';
      }
        else {
        indicatorCircle.style.backgroundColor = '#ff0000';
        connectionStatus.textContent = 'Не подключено';
        connectionSwitch.disabled = false;
        connectButtonAtt.display = 'flex';
        }
    } else {
      console.error('Ошибка запроса: ', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error('Ошибка сетевого запроса.');
  };

  xhr.send();
}

setInterval(connectAtt, 2000);

function connectBercut() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/bert/connect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            connectButtonBercut.style.display = 'none';
            pressButtonBercut_display.style.display = 'flex';
            disconnectButtonBercut.style.display = 'flex';
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

function disconnectBercut() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/bert/disconnect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            connectButtonBercut.style.display = 'flex';
            pressButtonBercut_display.style.display = 'none';
            disconnectButtonBercut.style.display = 'none';
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
    xhr.open('POST', '/bert/process', true);
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
    xhr.open('POST', '/snmp/process', true);
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
    xhr.open('POST', '/snmp/process', true);
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
    xhr.open('POST', '/att', true);
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

    xhr.send(JSON.stringify(Att));
}

function getOutputPower() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/M3M/output-power', true);
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
