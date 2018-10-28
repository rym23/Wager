import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private url = 'http://localhost:5000';  
  private socket = io(this.url);
  private room: string;

  setRoom(room: string){
    this.room = room;
    this.socket.emit('join', room);
  }

  sendNames( names: string[]){
    this.socket.emit('send-names', this.room, names);    
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
    this.socket.emit('send-command', this.room, command);    
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
