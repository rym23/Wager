import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent implements OnInit {
  private room: string;

  constructor(
    private controller: ControllerService,
    private router: Router) {
    this.room = this.randomCode();
    this.controller.setRoom(this.room);
   }

  ngOnInit() {
    this.controller.getCommand().subscribe(command => {
      console.log(command);
      if (command == 'next') {
        this.router.navigate(['/waiting']);
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
}
