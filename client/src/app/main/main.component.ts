import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private playerNames: string[];

  constructor(private controller: ControllerService,
    private router: Router) { }

  ngOnInit() {
    this.controller.getNames().subscribe( names => {
      console.log(names);
      this.playerNames = names['names'];
    });
    this.controller.getCommand().subscribe( command => {
      console.log(command);
      if(command == 'next'){
        
      }
      if(command == 'quit'){
        this.router.navigate(['/end']);
      }
    });
  }

}
