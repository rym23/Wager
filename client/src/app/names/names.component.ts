import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { group } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {
  playerGroup: FormGroup;
  public playerNames: FormArray;
  public playerNamesString: string[];

  ngOnInit() {
    this.playerGroup = this._fb.group({ 
      players: this._fb.array([this.initPlayers()])
    });
  }

  constructor (private _fb: FormBuilder) { 
    this.playerNamesString = [];
  }

  initPlayers() {
    return this._fb.group({
      playername: ['']
    });
  }

  addPlayer() {
    this.playerNames = <FormArray>this.playerGroup.controls['players'];
    this.playerNames.push(this.initPlayers());
  }

  deletePlayer(index: number) {
    this.playerNames = <FormArray>this.playerGroup.controls['players'];
    this.playerNames.removeAt(index);
  }

  ready () {
    this.playerNames = <FormArray>this.playerGroup.controls['players'];
    for(var item of this.playerNames.getRawValue()) {
      this.playerNamesString.push(item['playername']);
    }
  }
}
