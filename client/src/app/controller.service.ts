import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private url = 'http://localhost:5000';  
  private socket;
  
  sendNames(names: string[]){
    this.socket.emit('send-names', names);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
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
  
  getCommands() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
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
