import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  questionContent: string;
  questionsSet: Set<string>;

  constructor() {     
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
