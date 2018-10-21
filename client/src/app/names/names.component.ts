import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { group } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {
  playerGroup: FormGroup;

  ngOnInit() {
    this.playerGroup = this._fb.group({ 
      players: this._fb.array([this.initPlayers()])
    });
  }

  constructor (private _fb: FormBuilder) { }

  initPlayers() {
    return this._fb.group({
      playername: ['']
    });
  }

  addPlayer() {
    const control = <FormArray>this.playerGroup.controls['players'];
    control.push(this.initPlayers());
  }

  deletePlayer(index: number) {
    const control = <FormArray>this.playerGroup.controls['players'];
    control.removeAt(index);
  }
}
