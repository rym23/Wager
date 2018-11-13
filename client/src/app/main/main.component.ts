import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { transition, trigger, style, animate, state } from "@angular/animations";
import { QuestionBankService } from '../question-bank.service';
import { TurnService } from '../turn.service';
import { Subscription } from 'rxjs';

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
  private room;
  private commandSubscription: Subscription;

  constructor(
    private controller: ControllerService,
    private router: Router,
    private questionBank: QuestionBankService,
    private route: ActivatedRoute,
    private turn: TurnService) {
  }

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');
    this.newQuestion();
    this.commandSubscription = this.controller.getCommand(this.room).subscribe((command:String) => {
      console.log(command);
      if (command == 'quit') {
        this.router.navigate(['/end', this.room]);
      }
      if (command == 'nextTurn') {
        console.log("WHHYYY");
        this.router.navigate(['/category', this.room]);
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
    this.questionBank.getRandomQuestion(this.turn.getCategory()).subscribe(question => {
      this.questionContent = String(question);
      var playerOne = this.turn.getPlayerOne();
      var playerTwo = this.turn.getPlayerTwo();
      this.questionContent = this.questionContent.replace("${playerOne}", playerOne).replace("${playerTwo}", playerTwo);
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
  }

  ngOnDestroy(): void {
    this.commandSubscription.unsubscribe();
  }
}