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
  playerNum: number;

  ngOnInit() {
    this.playerGroup = this._fb.group({ 
      itemRows: this._fb.array([this.initItemRows()])
    });
  }

  constructor (private _fb: FormBuilder) {
    this.playerNum = 1;
  }

  initItemRows() {
    return this._fb.group({
      itemname: ['']
    });
  }

  addPlayer() {
    // this.playerNum += 1;
    const control = <FormArray>this.playerGroup.controls['itemRows'];
    control.push(this.initItemRows());
  }

  deletePlayer(index: number) {
    const control = <FormArray>this.playerGroup.controls['itemRows'];
    control.removeAt(index);
  }
}
