import { Injectable } from '@angular/core';
import { ControllerService } from './controller.service';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private playerNames: string[];
  private playerPointer: number;
  private playerTwo: string;
  private playerOne: string;
  private categories: string[];
  private currentCategory: string;

  constructor(private categoriesService: CategoriesService) {
    this.playerPointer = 0;
    this.categories = [];
    this.categoriesService.getCategories().subscribe(categories => {
      var categoryDictionary = categories as {};
      for (const [key, value] of Object.entries(categoryDictionary)) {
        this.categories.push(key);
      }
      console.log(this.categories);
    });
  }

  setPlayerNames(playerNames: string[]){
    this.playerNames = playerNames;
  }

  getPlayerOne() {
    return this.playerOne;
  }

  getPlayerTwo() {
    return this.playerTwo;
  }

  nextPlayers(){
    this.playerOne = this.playerNames[this.playerPointer];
    this.playerPointer = (this.playerPointer + 1) % this.playerNames.length;
    this.playerTwo = this.playerOne;
    while (this.playerOne === this.playerTwo) {
      this.playerTwo = this.playerNames[Math.floor(Math.random() * (this.playerNames.length))];
    }
  }

  nextCategory() {
    this.currentCategory = this.categories[Math.floor(Math.random() * (this.categories.length))]
  }

  getCategory(){
    return this.currentCategory;
  }  

  getCategories(){
    return this.categories;
  }
}
