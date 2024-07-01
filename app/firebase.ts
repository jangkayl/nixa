// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API,
	authDomain: "nixa-2c33d.firebaseapp.com",
	projectId: "nixa-2c33d",
	storageBucket: "nixa-2c33d.appspot.com",
	messagingSenderId: "94782553503",
	appId: "1:94782553503:web:b37bfe9ef8105a4932d1aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
