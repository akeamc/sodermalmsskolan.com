import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBd8VR6t9g4xhxT8vtqzzjAoLXLbFaaMug",
  authDomain: "sodermalmsskolan-a8013.firebaseapp.com",
  databaseURL: "https://sodermalmsskolan-a8013.firebaseio.com",
  projectId: "sodermalmsskolan-a8013",
  storageBucket: "sodermalmsskolan-a8013.appspot.com",
  messagingSenderId: "1035266952853",
  appId: "1:1035266952853:web:bea0a4e133fa21c29c159c",
};

if (firebase.apps.length <= 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
