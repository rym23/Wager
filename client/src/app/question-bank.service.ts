import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private collectionNames: string[] = [];
  private sizes: { [index: string]: number } = {};

  constructor(private afs: AngularFirestore, private categoriesService: CategoriesService) {
    this.categoriesService.getCategories().subscribe(categories => {
      var categoryDictionary = categories as {};
      for (const [key, value] of Object.entries(categoryDictionary)) {
        this.collectionNames.push(key);
      }
      this.sizes = categoryDictionary;
    });
  }

  getRandomQuestion(category: string) {
    let observable = new Observable(observer => {
      let size = this.sizes[category];
      console.log(size);
      let randomNumber = Math.floor((Math.random() * size));
      this.afs.firestore.collection("categories").firestore.collection(category)
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
