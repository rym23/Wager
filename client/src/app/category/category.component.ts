import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'ng-animate';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
  animation,
  keyframes
} from '@angular/animations';

export const tada = animation(
  animate(
    '{{ timing }}s {{ delay }}s',
    keyframes([
      style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
      style({
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.1,
      }),
      style({
        transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
        offset: 0.2,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.3,
      }),
      style({
        transform: 'scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg)',
        offset: 0.4,
      }),
      style({
        transform: 'scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, 3deg)',
        offset: 0.5,
      }),
      style({
        transform: 'scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, -3deg)',
        offset: 0.6,
      }),
      style({
        transform: 'scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, 3deg)',
        offset: 0.7,
      }),
      style({
        transform: 'scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg)',
        offset: 0.8,
      }),
      style({
        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        offset: 0.9,
      }),
      style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
    ])
  ),
  { params: { timing: 1, delay: 0 } }
);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('tada', [transition('false => true', useAnimation(tada))]),
    trigger('fadeIn', [transition('false => true', useAnimation(fadeIn))])
  ],
})
export class CategoryComponent implements OnInit {
  categories: string[] = ['Geography', 'Dancing', 'Singing', 'Music', 'Movies', 'Miscellaneous', 'Tim\'s Choice'];
  currentCategory: string = 'Trivia';
  selected: boolean = false;
  showOpponent: boolean = false;
  showOpponentLine: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  flipCard() {
    this.selected = false;
    this.showOpponent = false;
    this.showOpponentLine = false;
    var count = 0;
    var limit = 50 + Math.random() * 20;
    this.flipRecurser(count, limit, 100);
  }

  flipRecurser(count: number, limit: number, delay: number) {
    if (count > limit) {
      this.selected = true;
      this.delay(2000).then(any=>{
        this.showOpponentLine = true
        this.delay(3000).then(any=>{
          this.showOpponent = true;
        });
      });
      return;
    }
    
    if(limit - count < 15){
      delay += 10;
      if(limit - count < 3){
        delay+=10;
        if(limit - count == 1){
          delay += 500;
        }
      }
    }
    this.delay(delay).then(any => {
      this.currentCategory = this.categories[count % this.categories.length];
      count += 1;
      this.flipRecurser(count, limit, delay);
    });

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}
