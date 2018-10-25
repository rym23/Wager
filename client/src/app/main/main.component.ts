import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  private questionContent: string;
  private questionsSet: Set<string>;
  private playerNames: any;
  private playerPointer: number;

  constructor(private controller: ControllerService,
    private router: Router) { 
      this.playerPointer = 0;
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
    }

  ngOnInit() {
    this.controller.getNames().subscribe( players => {
      this.playerNames = players;
      this.newQuestion();
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
        var playerOne = this.getPlayerOne();
        var playerTwo = this.getPlayerTwo(playerOne);
        this.questionContent = item.replace("${playerOne}", playerOne).replace("${playerTwo}", playerTwo);
        this.questionsSet.delete(item);
        return;
      }
      i++;
    }
  }

  getPlayerOne() {
    var playerOne = this.playerNames[this.playerPointer];
    this.playerPointer = (this.playerPointer + 1) % this.playerNames.length;

    return playerOne;
  }

  getPlayerTwo(playerOne) {
    var playerTwo = playerOne;
    while (playerOne === playerTwo) {
      playerTwo = this.playerNames[Math.floor(Math.random() * (this.playerNames.length))];
    }
    return playerTwo;
  }
}
