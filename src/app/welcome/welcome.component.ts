import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ControllerService} from '../controller.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private controller: ControllerService) { }

  ngOnInit() {
    this.controller.getMessage().subscribe( data => {
      console.log(data);
    });
  }

  sendHi(){
    this.controller.sendMessage("hi");
  }

}