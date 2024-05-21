import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BercutService {
  constructor(private http: HttpClient) { }

  connectBercut() {
    return this.http.get('/bert/connect');
  }

  disconnectBercut() {
    return this.http.get('/bert/disconnect');
  }

  sendCommand(command: string) {
    return this.http.post('/bert/process', { command });
  }
}