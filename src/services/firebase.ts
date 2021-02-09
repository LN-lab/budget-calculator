// Fichier firebase.ts
import firebase from 'firebase/app'
import "firebase/database"
const config = {
  apiKey: "AIzaSyDm4YgO7uCoX6WR_iCX3CUqhDwd-JNyCkk",
  authDomain: "mon-budget-cf838.firebaseapp.com",
  projectId: "mon-budget-cf838",
  storageBucket: "mon-budget-cf838.appspot.com",
  messagingSenderId: "152486812848",
  appId: "1:152486812848:web:947e9aa4059caf1d012f75",
  measurementId: "G-L2TRTBZXX6"
}; firebase.initializeApp(config)
export default firebase.database()