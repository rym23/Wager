import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
questionContent: string;
questionsSet: Set<string>;
  private playerNames: string[];

  constructor(private controller: ControllerService,
    private router: Router) {
      this.questionsSet = new Set();
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "../../assets/questions.txt", false);
      xmlhttp.send();
      if (xmlhttp.status == 200)
        result = xmlhttp.responseText;
      var questionsArr = result.split("\n");
  
      for (let question of questionsArr) {
        this.questionsSet.add(question);
      }
  
      this.newQuestion();
     }

  ngOnInit() {
    this.controller.getNames().subscribe( names => {
      console.log(names);
      this.playerNames = names['names'];
    });
    this.controller.getCommand().subscribe( command => {
      console.log(command);
      if(command == 'next'){
        this.newQuestion();
      }
      if(command == 'quit'){
        this.router.navigate(['/end']);
      }
    });
  }

  newQuestion() {
    var randIndex = Math.floor(Math.random() * (this.questionsSet.size + 1));
    var i = 0;
    for (var item of Array.from(this.questionsSet.values())){
      if (i == randIndex)
      {
        this.questionContent = item;
        this.questionsSet.delete(item);
        return;
      }
      i++;
    }
  }
}
