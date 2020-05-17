import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDyr_6usPV8kcL7hTR2tWzGYGcVHXS9k8A",
    authDomain: "catch-of-the-day-39746.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-39746.firebaseio.com"
    // projectId: "catch-of-the-day-39746",
    // storageBucket: "catch-of-the-day-39746.appspot.com",
    // messagingSenderId: "1093157242983",
    // appId: "1:1093157242983:web:94f32fd87aed30381cacc2",
    // measurementId: "G-CFCRDNFBQ3"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;