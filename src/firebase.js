import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCyVl7nyQf1vdwvbZwb_D0p4vj_Jp-qKRY",
  authDomain: "agenda-tracker.firebaseapp.com",
  projectId: "agenda-tracker",
  storageBucket: "agenda-tracker.appspot.com",
  messagingSenderId: "564873262827",
  appId: "1:564873262827:web:815a0e1e9c1cf6c00fb0ae"
})

export { firebaseConfig as firebase }