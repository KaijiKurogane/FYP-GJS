import Firebase from 'firebase'
  
const config = {
  apiKey: "AIzaSyB78r6uZ9UQfbu5-debTZbOS8dbdIod9u4",
  authDomain: "gombak-jungle-school-6be9a.firebaseapp.com",
  databaseURL: "https://gombak-jungle-school-6be9a.firebaseio.com",
  projectId: "gombak-jungle-school-6be9a",
  storageBucket: "gombak-jungle-school-6be9a.appspot.com",
  messagingSenderId: "758117696829",
  appId: "1:758117696829:web:da502895ade86bec0cb154",
  measurementId: "G-16MXNZZVPX"
};
const database = Firebase.initializeApp(config)
const firebase = database.database()

export default firebase;