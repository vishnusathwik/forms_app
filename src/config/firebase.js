import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
// import "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUO519_7s2AL4yfutX5S4Gd_hQXQbRwXw",
  authDomain: "myiwt-d1b13.firebaseapp.com",
  databaseURL: "https://myiwt-d1b13-default-rtdb.firebaseio.com",
  projectId: "myiwt-d1b13",
  storageBucket: "myiwt-d1b13.appspot.com",
  messagingSenderId: "648503356207",
  appId: "1:648503356207:web:09f3d91a2aa979e260cfda"
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
