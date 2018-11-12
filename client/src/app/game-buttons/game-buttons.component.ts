import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.scss']
})
export class GameButtonsComponent implements OnInit {

  room: string;

  constructor(
    private controller: ControllerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');
  }

  next(){
    this.controller.sendCommand(this.room,"next");
  }

  quit(){
    this.controller.sendCommand(this.room,"quit");
    this.router.navigate(['/end', this.room]);
  }

}
