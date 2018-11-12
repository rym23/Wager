import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {
  private room;

  constructor(
    private controller: ControllerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');
    this.controller.getCommand(this.room).subscribe( command => {
      console.log(command);
      if(command == 'startGame'){
        this.router.navigate(['/main', this.room]);
      }
      if(command == 'quit'){
        this.router.navigate(['/end', this.room]);
      }
    });
  }

}
