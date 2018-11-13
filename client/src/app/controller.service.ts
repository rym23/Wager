import { Injectable } from '@angular/core';
import { Subject, Observable, combineLatest, of } from 'rxjs';
import * as io from 'socket.io-client';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  prevCommand: string = ''; 

  constructor(
    private afs: AngularFirestore,
  ) { }

  async createRoom(partyId: string) {

    const data = {
      createdAt: Date.now(),
      names: [],
      command: ''
    };

    const docRef = await this.afs.collection('rooms').doc(partyId).set(data);
  }

  getNames(partyId: string) {
	  return this.afs.collection('rooms').doc(partyId).valueChanges().pipe(
      map((data: any[]) => {
        if(data && data['names']){
          return data['names'];
        } else {
          return [''];
        }
      }));;
  }

  getCommand(partyId: string) {
	  return this.afs.collection('rooms').doc(partyId).valueChanges().pipe(
      map((data: any[]) => {
        if(data && data['command']){
          console.log("serv " + data['command']);
          return data['command'];
        } else {
          return '';
        }
      }));
  }

  async sendCommand(partyId: string, command: string) {
    const ref = this.afs.collection('rooms').doc(partyId);
    return ref.update({
      command: command
    });
  }

  async setNames(partyId: string, names: string[]) {
    const ref = this.afs.collection('rooms').doc(partyId);
    return ref.update({
      names: names
    });
  }

}
