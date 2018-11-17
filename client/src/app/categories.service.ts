import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private afs: AngularFirestore) { }

  getCategories(): Observable<any> {
    let observable = new Observable(observer => {
      this.afs.firestore.collection("categories")
        .get()
        .then(querySnapshot => {
          var categories = {};
          for (let doc of querySnapshot.docs) {
            categories[doc.id] = querySnapshot.size;
          }
          observer.next(categories);
        });
    });
    return observable;
  }
}
