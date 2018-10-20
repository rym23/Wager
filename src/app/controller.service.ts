import { Injectable } from '@angular/core';
import { Socket } from 'ng6-socket-io';
import { map } from "rxjs/operators";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
 
@Injectable()
export class ControllerService {
 
    constructor(private socket: Socket) { }
 
    sendMessage(msg: string){
        this.socket.emit("message", msg);
    }
    
    getMessage() {
        return this.socket
            .fromEvent("message")
            .pipe(map( data => data ));
    }
}