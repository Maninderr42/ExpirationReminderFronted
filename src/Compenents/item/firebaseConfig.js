// firebase.js (or wherever Firebase is initialized)
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaMWZ-5Ac2URgb9xEFy9VgHjXKkP5F6g8",
  authDomain: "epirationreminder.firebaseapp.com",
  projectId: "epirationreminder",
  storageBucket: "epirationreminder.appspot.com",
  messagingSenderId: "706342087934",
  appId: "1:706342087934:web:b9b536ae5b107772ca09af"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
