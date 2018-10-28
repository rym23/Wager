import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Router } from '@angular/router';
import { transition, trigger, style, animate, state } from "@angular/animations";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(50%)'}))
      ])
    ])
  ]
})

export class MainComponent implements OnInit {
  visible: boolean = false;
  private questionContent: string;
  private questionsSet: Set<string>;
  private playerNames: any;
  private playerPointer: number;
  private categories: any[];

  constructor(private controller: ControllerService,
    private router: Router, private afs: AngularFirestore) {
    this.loadCategories();
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
    var category = this.getRandomCategory();
    var size = this.categories[category];
    this.afs.firestore.collection(category)
        .where('rand', '>', size).limit(1)
        .get()
        .then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                      console.log(doc.id); // id of doc
                      console.log(doc.data()); // data of doc
                })
        });
    var randIndex = Math.floor(Math.random() * (this.questionsSet.size + 1));
    var i = 0;
    for (var item of Array.from(this.questionsSet.values())) {
      if (i == randIndex) {
        var playerOne = this.getPlayerOne();
        var playerTwo = this.getPlayerTwo(playerOne);
        this.questionContent = item.replace("${playerOne}", playerOne).replace("${playerTwo}", playerTwo);
        this.questionsSet.delete(item);
        return;
      }
      i++;
    };
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

  getRandomCategory() {
    return this.categories.keys()[Math.floor(Math.random() * (this.categories.length))];
  }

  loadCategories() {
    var collectionNames = ["Geography", "Impressions", "Movies", "Music", "Physical Challenges", "Singing", "Sports", "Unfair"];
    collectionNames.forEach(function(collection){
      this.afs.firestore.collection(collection)
        .get()
        .then(snap => {
        this.categories['category'] = snap.size;
      })
    });
  }
}
