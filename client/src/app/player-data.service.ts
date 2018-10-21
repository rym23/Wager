import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {

  private playerNamesSource = new BehaviorSubject<string[]>([]);
  currentplayerNames = this.playerNamesSource.asObservable();

  constructor() { }

  changeplayerNames(playerNames: string[]) {
    this.playerNamesSource.next(playerNames)
  }
}
