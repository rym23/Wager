import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const deleteOldItems = functions.firestore.document('/rooms/{pushId}').onCreate((create, context) => {
  const ref = create.ref.parent;
  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;
  const oldItemsQuery = ref.orderBy('createdAt').endAt(cutoff);
  return oldItemsQuery.get()
  .then((snapshot) => {
        // create a map with all children that need to be removed
        snapshot.forEach(function(child) {
            ref.doc(child.id).delete();
        });
        // execute all updates in one go and return the result to end the function
        return ref;
  }).catch(err => console.log(err));
});