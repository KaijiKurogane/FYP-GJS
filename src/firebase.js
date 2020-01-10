import Firebase from 'firebase'
  
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
const database = Firebase.initializeApp(config)
const firebase = database.database()

export default firebase;