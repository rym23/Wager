import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { group } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { PlayerDataService } from '../player-data.service';
import { ControllerService } from '../controller.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {
  playerGroup: FormGroup;
  public playerNames: FormArray;
  public playerNamesString: string[];
  public enoughPlayers: boolean;
  private room: string;

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');
    this.playerGroup = this._fb.group({ 
      players: this._fb.array([this.initPlayers()])
    });
  }

  constructor (
    private _fb: FormBuilder,
    private controller: ControllerService,
    private router: Router,
    private route: ActivatedRoute) { 
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
    if (this.playerNames.length > 1)
      this.enoughPlayers = true;
  }

  deletePlayer(index: number) {
    this.playerNames = <FormArray>this.playerGroup.controls['players'];
    this.playerNames.removeAt(index);

    if (this.playerNames.length < 2)
      this.enoughPlayers = false;
  }

  ready () {
    this.playerNames = <FormArray>this.playerGroup.controls['players'];
    for(var item of this.playerNames.getRawValue()) {
      this.playerNamesString.push(item['playername']);
    }
    this.controller.sendCommand(this.room, "startGame");
    this.controller.setNames(this.room, this.playerNamesString);
    this.router.navigate(['/game-buttons', this.room]);
  }
}