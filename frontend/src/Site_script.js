function openModalID(ModalID) {
  document.getElementById(ModalID).style.display = "block";
}

function closeModalID(ModalID) {
  document.getElementById(ModalID).style.display = "none";
}

 const inputField = document.getElementById('inputField'); 
 const disconnectButtonBercut = document.getElementById('disconnectButtonBercut');
 const connectButtonBercut = document.getElementById('connectButtonBercut');
 const pressButtonBercut_display = document.getElementById("pressButtonBercut");

 const indicatorCircle = document.querySelector('.indicator-circle');
 const connectionStatus = document.querySelector('.connection-status');
 const connectButtonAtt = document.getElementById('connectButtonAtt');
 const connectionSwitch = document.getElementById('connectionSwitch');
 const connectionType = document.getElementById('connectionType');

 const BercutConnectionStatus = document.getElementById('BercutConnectionStatus');
 const AttConnectionStatus = document.getElementById('AttConnectionStatus');

 const AttTypeConnection = document.getElementById('AttTypeConnection');
 const Attenuation= document.getElementById('Attenuation');

 const Stat1IpAddress = document.getElementById("Stat1IpAddress");
 const Stat1Frequency = document.getElementById("Stat1Frequency");
 const Stat1Regime = document.getElementById("Stat1Regime");
 const Stat1Bandwidth = document.getElementById("Stat1Bandwidth");

 const Stat2IpAddress = document.getElementById("Stat2IpAddress");
 const Stat2Frequency = document.getElementById("Stat2Frequency");
 const Stat2Regime = document.getElementById("Stat2Regime");
 const Stat2Bandwidth = document.getElementById("Stat2Bandwidth");


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
  const xhr = new XMLHttpRequest();

  const selectedConnectionType = connectionType.textContent;
  const url = `/api/connection-status${selectedConnectionType}`;

  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        if (connectionType.textContent == 'Ethernet') {
        AttTypeConnection.textContent = 'Подключение: Ethernet';
        AttConnectionStatus.style.color = '#28a745';
        AttConnectionStatus.textContent = 'Подключено'
        indicatorCircle.style.backgroundColor = '#28a745;';
        connectionStatus.textContent = 'Подключено';
        connectionSwitch.disabled = true;
        connectButtonAtt.display = 'none';
      } else if (connectionType.textContent == 'COM-port') {
        AttTypeConnection.textContent = 'Подключение: COM-port';
        AttConnectionStatus.style.color = '#28a745';
        AttConnectionStatus.textContent = 'Подключено'
        indicatorCircle.style.backgroundColor = '#28a745;';
        connectionStatus.textContent = 'Подключено';
        connectionSwitch.disabled = true;
        connectButtonAtt.display = 'none';
      }
        else {
        AttTypeConnection.textContent = 'Подключение:';
        AttConnectionStatus.style.color = '#ff0000';
        AttConnectionStatus.textContent = 'Отключено'
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

//setInterval(connectAtt, 2000);

function connectBercut() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/bert/connect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            BercutConnectionStatus.style.color = '#28a745';
            BercutConnectionStatus.textContent = 'Подключено' //
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
    xhr.open('GET', '/bert/disconnect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            BercutConnectionStatus.style.color = '#ff0000';
            BercutConnectionStatus.textContent = 'Отключено'
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
    const inputIP = document.getElementById('inputIP1');
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
        },
        {
            oid: "IP",
            value: inputIP.value
        }
    ]

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/snmp/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            Stat1Frequency.textContent = frequency;
            Stat1Regime.textContent = regime;
            Stat1Bandwidth.textContent = bandwidth;
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
    const inputFrequency2 = document.getElementById("inputFrequency2");
    const selectedRegime2 = document.getElementById('selectionRegime2');
    const selectedBandwidth2 = document.getElementById('selectionBandwidth2');
    const inputIP = document.getElementById('inputIP2');
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
        },
        {
            oid: "IP",
            value: inputIP.value
        }
    ]

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/snmp/process', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            Stat2Frequency.textContent = frequency;
            Stat2Regime.textContent = regime;
            Stat2Bandwidth.textContent = bandwidth;
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
    const Attenuation = document.getElementById("Attenuation");
    let Att = inputAtt.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/att', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            Attenuation.innerHTML += Att;
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

document.addEventListener('DOMContentLoaded', function() {
  let ipAddressInputs = document.getElementsByClassName('ip-address');

  for (let i = 0; i < ipAddressInputs.length; i++) {
    let ipAddressInput = ipAddressInputs[i];

    ipAddressInput.addEventListener('input', function(e) {
      let value = e.target.value;
      value = value.replace(/[^0-9.]/g, '');
      
      let octets = value.split('.');
      for (let j = 0; j < octets.length; j++) {
        if (octets[j] !== '') {
          octets[j] = parseInt(octets[j]);
          if (isNaN(octets[j]) || octets[j] < 0 || octets[j] > 255) {
            octets[j] = '255';
          }
        }
      }
      
      e.target.value = octets.join('.');
    });

    ipAddressInput.addEventListener('keydown', function(e) {
      if (e.key === '.' && (e.target.value === '' || e.target.value.endsWith('.'))) {
        e.preventDefault();
      }
    });
  }
});
