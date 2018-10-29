import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private categories: { [index: string]: number } = {};

  constructor(private afs: AngularFirestore) {
    this.loadCategories();
  }

  loadCategories() {
    var collectionNames = ["Geography", "Impressions", "Movies", "Music", "Physical Challenges", "Singing", "Sports", "Unfair"];
    for (let collection of collectionNames) {
      this.afs.firestore.collection(collection)
        .get()
        .then(snap => {
          this.categories[collection] = snap.size;
        });
    };
  }

  getRandomCategory() {
    let size: number = Object.keys(this.categories).length;
    let keys: string[] = Object.keys(this.categories);
    return keys[Math.floor(Math.random() * (size - 1))];
  }

  getRandomQuestion() {
    let observable = new Observable(observer => {
      let category = this.getRandomCategory();
      let size = this.categories[category];
      let randomNumber = Math.floor((Math.random() * size));
      this.afs.firestore.collection(category)
        .where('question_id', '==', randomNumber).limit(1)
        .get()
        .then(querySnapshot => {
          let question = querySnapshot.docs[0].get('question');
          observer.next(question);
        });
    });
    return observable;
  }
}
