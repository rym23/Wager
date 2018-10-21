import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.scss']
})
export class GameButtonsComponent implements OnInit {

  constructor(
    private controller: ControllerService,
    private router: Router) { }

  ngOnInit() {
  }

  next(){
    this.controller.sendCommand("next");
  }

  quit(){
    this.controller.sendCommand("quit");
    this.router.navigate(['/end']);
  }

}
