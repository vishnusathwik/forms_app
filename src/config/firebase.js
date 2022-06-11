import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
// import "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPPDnLQF6RAGjE88B6B5Iy4jdirg2YjTA",
  authDomain: "iwtassignment-aeefa.firebaseapp.com",
  projectId: "iwtassignment-aeefa",
  storageBucket: "iwtassignment-aeefa.appspot.com",
  messagingSenderId: "103502324216",
  appId: "1:103502324216:web:d0fc173e84c1cec3d7b60d",
  measurementId: "G-CMNQVEMV3P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ACTION--------------------------------------------------------------

// sign in
export const signInToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  );

// sign up
export const signUpToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  );

// post
export const postDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .push(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

// set
export const setDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .set(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

// get
export const getDataFromDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) =>
        snapshot.val()
          ? resolve(snapshot.val())
          : reject("data not found or database error")
      )
  );

// delete
export const deleteDataDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .remove()
      .then(() => resolve(true))
      .catch((e) => reject(e))
  );
