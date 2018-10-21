import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {

  constructor(private controller: ControllerService,
    private router: Router) { }

  ngOnInit() {
    this.controller.getCommand().subscribe( command => {
      console.log(command);
      if(command == 'next'){
        this.router.navigate(['/main']);
      }
      if(command == 'quit'){
        this.router.navigate(['/end']);
      }
    });
  }

}
