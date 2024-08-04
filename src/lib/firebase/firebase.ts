import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyHVjX375OWGhpQ_fgO5RavUK305YjV6A",
  authDomain: "nimble-test-task.firebaseapp.com",
  projectId: "nimble-test-task",
  storageBucket: "nimble-test-task.appspot.com",
  messagingSenderId: "703467545423",
  appId: "1:703467545423:web:a36a6e82b04b683701db3a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)