import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private categories: { [index: string]: number } = {};

  constructor(
    private afs: AngularFirestore) {
    this.loadCategories();
  }

  loadCategories() {
    var collectionNames = ["Geography", "Impressions", "Movies", "Music", "Physical Challenges", "Singing", "Sports", "Unfair", "Miscellaneous"];
    for (let collection of collectionNames) {
      this.afs.firestore.collection(collection)
        .get()
        .then(snap => {
          this.categories[collection] = snap.size;
        });
    };
  }

  getRandomQuestion(category: string) {
    let observable = new Observable(observer => {
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
