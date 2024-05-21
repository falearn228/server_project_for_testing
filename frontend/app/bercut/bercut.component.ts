import { Component } from '@angular/core';
import { BercutService } from './bercut.service';

@Component({
  selector: 'app-bercut',
  templateUrl: './bercut.component.html',
  styleUrls: ['./bercut.component.css']
})

export class BercutComponent {
  command: string; 

  constructor(private bercutService: BercutService) {
    this.command = ''; 
  }

  connect() {
    this.bercutService.connectBercut().subscribe((response: any) => {
      console.log('Connected', response);
    });
  }

  disconnect() {
    this.bercutService.disconnectBercut().subscribe((response: any) => {
      console.log('Disconnected', response);
    });
  }

  sendCommand() {
    this.bercutService.sendCommand(this.command).subscribe((response: any) => {
      console.log('Command response', response);
    });
  }
}