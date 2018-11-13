import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent implements OnInit {
  private room: string;
  private commandSubscription: Subscription;

  constructor(
    private controller: ControllerService,
    private router: Router) {
   }

  ngOnInit() {
    this.room = this.randomCode();
    this.controller.createRoom(this.room);
    this.commandSubscription = this.controller.getCommand(this.room).subscribe(command => {
      console.log(command);
      if (command == 'goToWaitingRoom') {
        this.router.navigate(['/waiting', this.room]);
      }
    });
  }

  randomCode() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    for (let i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  ngOnDestroy(): void {
    this.commandSubscription.unsubscribe();
  }
}
