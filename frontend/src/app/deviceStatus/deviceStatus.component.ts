// @ts-nocheck
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deviceStatus',
  templateUrl: './deviceStatus.component.html',
  styleUrls: ['./deviceStatus.component.css']
})

export class deviceStatusComponent {
  connectButtonBercut: HTMLElement | null = null;
  disconnectButtonBercut: HTMLElement | null = null;

  connectButtonAtt: HTMLElement | null = null;
  disconnectButtonAtt: HTMLElement | null = null;

  inputFrequency: HTMLElement | null = null;
  selectionBandwidth: HTMLElement | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.connectButtonBercut = document.getElementById('connectButtonBercut');
    this.disconnectButtonBercut = document.getElementById('disconnectButtonBercut');

    this.connectButtonAtt = document.getElementById('connectButtonAtt');
    this.disconnectButtonAtt = document.getElementById('disconnectButtonAtt');

    this.inputFrequency = document.getElementById('inputFrequency');
    this.selectionBandwidth = document.getElementById('selectionBandwidth');
  }

  connectBer() {
    const url = `/Bercut/connect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonBercut && this.disconnectButtonBercut) {
        this.connectButtonBercut.style.display = 'none';
        this.disconnectButtonBercut.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  disconnectBer() {
    const url = `/Bercut/disconnect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonBercut && this.disconnectButtonBercut) {
        this.connectButtonBercut.style.display = 'flex';
        this.disconnectButtonBercut.style.display = 'none';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  connectAtt() {
    const url = `/att/connect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonAtt && this.disconnectButtonAtt) {
        this.connectButtonAtt.style.display = 'none';
        this.disconnectButtonAtt.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  disconnectAtt() {
    const url = `/att/disconnect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonatt && this.disconnectButtonatt) {
        this.connectButtonAtt.style.display = 'flex';
        this.disconnectButtonAtt.style.display = 'none';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  sendOID() {
    const url = `/snmp/process`;

    const InputedParams = [
      {
        oid: "Frequncy",
        value: this.inputFrequency
      },
      {
        oid: "Width",
        value: this.selectionBandwidth
      }
    ];

    this.http.post(url, InputedParams, { responseType: 'json' }).subscribe(
      (response : any) => {
        if (this.inputFrequency && this.selectionBandwidth) {
        this.connectButtonBercut.style.display = 'none';
        this.disconnectButtonBercut.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  sendIP() {
    const url = `/station/sendIP`;


    this.http.post(url, InputedParams, { responseType: 'json' }).subscribe(
      (response : any) => {
        if (this.connectButtonBercut && this.disconnectButtonBercut) {
        this.connectButtonBercut.style.display = 'none';
        this.disconnectButtonBercut.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  swapMode() {
    const url = `/Bercut/connect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonBercut && this.disconnectButtonBercut) {
        this.connectButtonBercut.style.display = 'none';
        this.disconnectButtonBercut.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }

  sendM3M() {
    const url = `/Bercut/connect`;

    this.http.get(url, { responseType: 'json' }).subscribe(
      (response) => {
        if (this.connectButtonBercut && this.disconnectButtonBercut) {
        this.connectButtonBercut.style.display = 'none';
        this.disconnectButtonBercut.style.display = 'flex';
      }
      },
      (error) => {
        console.error('Ошибка запроса: ', error.message);
      }
    );
  }
}