import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyD8b7H1n9oqTiX15Mx1Ca41pO0JprpM_-o",
    authDomain: "catch-of-the-day---disha.firebaseapp.com",
    databaseURL: "https://catch-of-the-day---disha-default-rtdb.firebaseio.com",
 });

 const base = Rebase.createClass(firebase.database());

 // this is a named export
 export { firebaseApp };

 //this is a default export 
 export default base;