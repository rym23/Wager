import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private url = 'http://localhost:5000';  
  private socket = io(this.url);

  sendNames(names: string[]){
    this.socket.emit('send-names', names);    
  }
  
  getNames() {
    let observable = new Observable(observer => {
      this.socket.on('names', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  sendCommand(command: string){
    this.socket.emit('send-command', command);    
  }
  
  getCommand() {
    let observable = new Observable(observer => {
      this.socket.on('command', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}
