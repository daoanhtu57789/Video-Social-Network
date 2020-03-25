import firebase from 'firebase';
const  firebaseConfig = {
  apiKey: "AIzaSyBfSmuge_ENMv9xnmv3biKjZbnJHkcHF_A",
  authDomain: "videos-social-a5007.firebaseapp.com",
  databaseURL: "https://videos-social-a5007.firebaseio.com",
  projectId: "videos-social-a5007",
  storageBucket: "videos-social-a5007.appspot.com",
  messagingSenderId: "542980470070",
  appId: "1:542980470070:web:857f5380d30e0007c5ef97",
  measurementId: "G-W9BTHYZCN5"
};
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;