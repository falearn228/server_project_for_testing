window.onload = function() {
    var output_BASE_to_M3M = document.getElementById("output_BASE_to_M3M");
    var output_BASE_to_ABONENT = document.getElementById("output_BASE_to_ABONENT");

    output_BASE_to_M3M.value = "";
    output_BASE_to_ABONENT.value = "";
};

function openModalID(ModalID) {
  document.getElementById(ModalID).style.display = "block";
}

function closeModalID(ModalID) {
  document.getElementById(ModalID).style.display = "none";
}

 const inputFieldBercut = document.getElementById('inputField'); 
 const connectionStatusBercut = document.getElementById('connection-status-Bercut');
 const disconnectButtonBercut = document.getElementById('disconnectButtonBercut');
 const connectButtonBercut = document.getElementById('connectButtonBercut');
 const pressButtonBercut_display = document.getElementById("pressButtonBercut");

 const connectionStatusAtt = document.getElementById('connection-status-Att');
 const connectButtonAtt = document.getElementById('connectButtonAtt');
 const pressButtonAtt = document.getElementById('pressButtonAtt');
 const disconnectButtonAtt = document.getElementById('disconnectButtonAtt');

 const indicatorCircleBercut = document.getElementById('indicator-circle-Bercut');
 const indicatorCircleAtt = document.getElementById('indicator-circle-Att');
 const indicatorCircleM3M = document.getElementById('indicator-circle-M3M');
 
 const connectButtonM3M = document.getElementById('connectButtonM3M');
 const pressButtonM3M = document.getElementById('pressButtonM3M');
 const disconnectButtonM3M = document.getElementById('disconnectButtonM3M');

 const BercutConnectionStatus = document.getElementById('BercutConnectionStatus');
 const AttConnectionStatus = document.getElementById('AttConnectionStatus');
 const M3MConnectionStatus = document.getElementById('M3MConnectionStatus');

 const AttTypeConnection = document.getElementById('AttTypeConnection');
 const Attenuation= document.getElementById('Attenuation');

function EXPRESS_TEST() {
    const output_EXPRESS_TEST = document.getElementById("output_EXPRESS_TEST");

    const xhr = new XMLHttpRequest();

    const url = `/Test/EXPRESS_TEST`;
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        output_EXPRESS_TEST.value = xhr.response + " дБ";
      } 
       else {
          console.error('Ошибка запроса: ', xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error('Ошибка сетевого запроса.');
    };
  
    xhr.send();
}

function Calculate_attenuation() {
    const input_SUM_PA = document.getElementById("input_SUM_PA");
    const input_Splitter = document.getElementById("input_Splitter");
    const input_Cable = document.getElementById("input_Cable");

    let SUM_PA_value = input_SUM_PA.value;
    let Splitter_value = input_Splitter.value;
    let Cable_value = input_Cable.value;

    const output_BASE_to_M3M = document.getElementById("output_BASE_to_M3M");
    const output_BASE_to_ABONENT = document.getElementById("output_BASE_to_ABONENT");

    let InputedParams = [
        {
            device: "Attenuators",
            value: Cable_value
        },
        {
            device: "Splitter",
            value: Splitter_value
        },
        {
            device: "Cable",
            value: SUM_PA_value
        }
    ]

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/Test/Attenuation', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);   // ОТПРАВЛЯТЬ в таком виде -> res.status(200).json([227, 444]);
            var value1 = response[0];
            var value2 = response[1];
            output_BASE_to_M3M.value = value1; // ПЕРВОЕ И ВТОРОЕ ЗНАЧЕНИЕ ЭТО ПЕРВАЯ И ВТОРАЯ ЛИНИЯ СООТВЕТСТВЕННО.
            output_BASE_to_ABONENT.value = value2;
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

function connectAtt() {
  const xhr = new XMLHttpRequest();

  const url = `/att/connect`;

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        AttTypeConnection.textContent = 'Подключение: Ethernet';
        AttConnectionStatus.style.color = '#28a745';
        AttConnectionStatus.textContent = 'Подключено'
        indicatorCircleAtt.style.backgroundColor = '#28a745';
        connectionStatusAtt.textContent = 'Подключено';
        connectButtonAtt.style.display = 'none';
        pressButtonAtt.style.display = 'flex';
        disconnectButtonAtt.style.display = 'flex';
    } 
     else {
        console.error('Ошибка запроса: ', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error('Ошибка сетевого запроса.');
  };

  xhr.send();
}

function disconnectAtt() {
  const xhr = new XMLHttpRequest();
  const url = `/att/disconnect`;
  const Attenuation = document.getElementById("Attenuation");

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        AttTypeConnection.textContent = 'Подключение:';
        AttConnectionStatus.style.color = '#ff0000';
        AttConnectionStatus.textContent = 'Отключено'
        indicatorCircleAtt.style.backgroundColor = '#ff0000';
        connectionStatusAtt.textContent = 'Не подключено';
        connectButtonAtt.style.display = 'flex';
        pressButtonAtt.style.display = 'none';
        Attenuation.innerText = "Ослабление: ";
        disconnectButtonAtt.style.display = 'none';
    } 
    else {
        console.error('Ошибка запроса: ', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error('Ошибка сетевого запроса.');
  };

  xhr.send();
}

function sendAtt() {
    const inputAtt = document.getElementById("inputAtt");
    const Attenuation = document.getElementById("Attenuation");
    let Att = inputAtt.value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/att/setValue', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            Attenuation.innerText = "Ослабление: " + xhr.response + " дБ";
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };
    xhr.send(JSON.stringify({ value: Att }));
}

function getAtt() {
    const Attenuation = document.getElementById("Attenuation");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/att/getValue', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            Attenuation.innerText = "Ослабление: " + xhr.response + " дБ";
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };
    xhr.send();
}

function connectBercut() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/bert/connect', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            BercutConnectionStatus.style.color = '#28a745';
            BercutConnectionStatus.textContent = 'Подключено' 
            connectButtonBercut.style.display = 'none';
            pressButtonBercut_display.style.display = 'flex';
            disconnectButtonBercut.style.display = 'flex';
            indicatorCircleBercut.style.backgroundColor = '#28a745';
            connectionStatusBercut.textContent = 'Подключено';
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
            indicatorCircleBercut.style.backgroundColor = '#ff0000';
            connectionStatusBercut.textContent = 'Не подключено';
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
    const inputFieldBercut = document.getElementById("inputFieldBercut");
    const command = inputFieldBercut.value;

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
    // inputFieldBercut.value = "";
}

function SwapIPContent() {
    const inputIP_BASED = document.getElementById("inputIP-BASE");
    const inputIP_ABONENT = document.getElementById("inputIP-ABONENT");
    
    const Based_value = inputIP_BASED.value;
    const Abonent_value = inputIP_ABONENT.value;

    inputIP_BASED.value = Abonent_value;
    inputIP_ABONENT.value = Based_value;
}

function stationIPSettings() {
    const inputIP_BASED = document.getElementById("inputIP-BASE");
    const inputIP_ABONENT = document.getElementById("inputIP-ABONENT");
    const statConnectionStatus = document.getElementById('statConnectionStatus');
    const inputIP_ABONENT_display = document.getElementById("inputIP-ABONENT-value");
    const inputIP_BASE_display = document.getElementById("inputIP-BASE-value");

    let Based_value = inputIP_BASED.value;
    let Abonent_value = inputIP_ABONENT.value;

    let InputedIP = [
        {
            value: "BASE",
            IP: Based_value
        },
        {
            value: "ABONENT",
            IP: Abonent_value
        }
    ]

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/snmp/setIP', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            statConnectionStatus.textContent = "Успешно";
            statConnectionStatus.style.color = "#28a745";
            inputIP_BASE_display.textContent = Based_value;
            inputIP_ABONENT_display.textContent = Abonent_value;
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            statConnectionStatus.textContent = "Ошибка";
            statConnectionStatus.style.color = "#ff0000";
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };
    xhr.send(JSON.stringify(InputedIP));
}

function sendStatSettings() {
    const inputFrequency = document.getElementById("inputFrequency");
    const selectedBandwidth = document.getElementById("selectionBandwidth");
    const selectionModulation = document.getElementById("selectionModulation");
    const statConnectionStatus = document.getElementById('statConnectionStatus');
    const StationFrequency = document.getElementById("StationFrequency");
    const StationBandwidth = document.getElementById("StationBandwidth");
    const StationModulation = document.getElementById("StationModulation");

    var selectedOption = selectionModulation.options[selectionModulation.selectedIndex];
    var selectedText = selectedOption.text;

    let frequency = inputFrequency.value;
    //let regime = selectedRegime1.value;
    let bandwidth = selectedBandwidth.value;
    let modulation = selectionModulation.value;
    let InputedParams = [
        {
            oid: "Frequncy",
            value: frequency
        },
        // {
        //     oid: "Mode",
        //     value: regime
        // },
        {
            oid: "Modulation",
            value: modulation
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
            statConnectionStatus.textContent = "Успешно";
            statConnectionStatus.style.color = "#28a745";
            StationFrequency.textContent = frequency + " КГц";
            //Stat1Regime.textContent = (regime ? "База" : "Абонент");
            StationBandwidth.textContent = (bandwidth > 3 ? "20 МГц" : "10 МГц");
            StationModulation.textContent = selectedText;
            console.log(xhr.response);
        } else if (xhr.status >= 400) {
            statConnectionStatus.textContent = "Ошибка";
            statConnectionStatus.style.color = "#ff0000";
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
    };
    xhr.send(JSON.stringify(InputedParams));
}

// function sendStat2() {
//     const inputFrequency = document.getElementById("inputFrequency");
//     const selectedRegime2 = document.getElementById('selectionRegime');
//     const selectedBandwidth2 = document.getElementById('selectionBandwidth');
//     const stat2ConnectionStatus = document.getElementById('Stat2ConnectionStatus');
//     const IP_address = inputIpStat2.value;
//     let frequency = inputFrequency.value;
//     let regime = selectedRegime2.value;
//     let bandwidth = selectedBandwidth2.value;
//     let InputedParams = [
//         {
//             oid: "Frequncy",
//             value: frequency
//         },
//         {
//             oid: "Mode",
//             value: regime
//         },
//         {
//             oid: "Width",
//             value: bandwidth
//         },
//         {
//             IP: IP_address
//         }
//     ]

//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/snmp/process', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');

//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             Stat2IpAddress.textContent = IP_address;
//             stat2ConnectionStatus.textContent = "Успешно";
//             stat2ConnectionStatus.style.color = "#28a745";
//             Stat2Frequency.textContent = frequency + " МГц";
//             Stat2Regime.textContent = (regime == true ? "База" : "Абонент");;
//             Stat2Bandwidth.textContent = (bandwidth > 3 ? "20 МГц" : "10 МГц");
//             console.log(xhr.response);
//         } else if (xhr.status >= 400) {
//             stat2ConnectionStatus.textContent = "Ошибка";
//             stat2ConnectionStatus.style.color = "#ff0000";
//             console.error("Ошибка запроса: ", xhr.status);
//         }
//     };

//     xhr.onerror = function() {
//         console.log(xhr.response);
//     };

//     xhr.send(JSON.stringify(InputedParams));
// }
  
function sendM3M() {
      const inputM3M = document.getElementById("inputM3M");
      const M3MTypeConnection = document.getElementById("M3MTypeConnection");
      let M3M_offset = inputM3M.value;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/M3M/setValue', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onload = function() {
          if (xhr.status === 200) {
            M3MTypeConnection.innerText = "Подключение: Com-port";
            M3MConnectionStatus.innerText = "Успешно";
            M3MConnectionStatus.style.color = "#28a745";
            console.log(xhr.response);
          } else if (xhr.status >= 400) {
            M3MTypeConnection.innerText = "";
            M3MConnectionStatus.innerText = "Подключение: Ошибка";
            M3MConnectionStatus.style.color = "#ff0000";
            console.error("Ошибка запроса: ", xhr.status);
          }
      };
  
      xhr.onerror = function() {
          console.log(xhr.response);
      };
      xhr.send(JSON.stringify({ value: M3M_offset }));
}

function getValueM3M() {
    const M3Moffset = document.getElementById("M3Moffset");
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/M3M/getValue', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            M3Moffset.innerText = "Offset: " + xhr.response + " дБ";
        } else if (xhr.status >= 400) {
            console.error("Ошибка запроса: ", xhr.status);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.response);
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
