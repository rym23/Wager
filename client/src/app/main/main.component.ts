import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';
import { transition, trigger, style, animate, state } from "@angular/animations";
import { QuestionBankService } from '../question-bank.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(60%)' }))
      ])
    ])
  ]
})

export class MainComponent implements OnInit {
  visible: boolean = false;
  private questionContent: string;
  private playerNames: any;
  private playerPointer: number;

  constructor(
    private controller: ControllerService,
    private router: Router,
    private questionBank: QuestionBankService) {
    this.playerPointer = 0;
  }

  ngOnInit() {
    this.controller.getNames().subscribe(players => {
      this.playerNames = players;
      this.newQuestion();
    });
    this.controller.getCommand().subscribe(command => {
      console.log(command);
      if (command == 'next') {
        this.newQuestion();
      }
      if (command == 'quit') {
        this.router.navigate(['/end']);
      }
    });
  }

  newQuestion() {
    this.visible = false;
    this.delay(505).then(any => {
      this.getQuestion();
      this.visible = true;
    });
  }

  getQuestion() {
    this.questionBank.getRandomQuestion().subscribe(question => {
      this.questionContent = String(question);
      console.log(this.questionContent);
      console.log(question);
      console.log(question['question']);
      var playerOne = this.getPlayerOne();
      var playerTwo = this.getPlayerTwo(playerOne);
      this.questionContent = this.questionContent.replace("${playerOne}", playerOne).replace("${playerTwo}", playerTwo);
    });
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

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}