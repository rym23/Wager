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
  private playerNames: any;
  private lastPlayers: string[];

  constructor(private controller: ControllerService,
    private router: Router) { 
      this.lastPlayers = [];
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
        this.updateLastPlayers(playerOne, playerTwo);
        this.questionContent = item.replace("${playerOne}", playerOne).replace("${playerTwo}", playerTwo);
        this.questionsSet.delete(item);
        return;
      }
      i++;
    }
  }

  getPlayerOne() {
    var playerOne = this.playerNames[Math.floor(Math.random() * (this.playerNames.length))];
    // Prevents choosing the same people two rounds in a row if there are more than 2 people.
    if (this.playerNames.length > 2) {
        while(this.lastPlayers.includes(playerOne)) {
        playerOne = this.playerNames[Math.floor(Math.random() * (this.playerNames.length))];
      }
    }
    return playerOne;
  }

  getPlayerTwo(playerOne) {
    var playerTwo = playerOne;
    while (playerOne === playerTwo || (this.lastPlayers.includes(playerTwo) && this.playerNames.length > 3)) {
      playerTwo = this.playerNames[Math.floor(Math.random() * (this.playerNames.length))];
    }
    return playerTwo;
  }

  updateLastPlayers(playerOne, playerTwo) {
    this.lastPlayers = [];
    this.lastPlayers.push(playerOne);
    this.lastPlayers.push(playerTwo);
  }
}
