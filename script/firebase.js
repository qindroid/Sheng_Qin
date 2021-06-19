// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDSFrLmlKoT755SdmmlzdadAG0TtmTNPGE",
  authDomain: "qinsheng-personal-website.firebaseapp.com",
  projectId: "qinsheng-personal-website",
  storageBucket: "qinsheng-personal-website.appspot.com",
  messagingSenderId: "348525259578",
  appId: "1:348525259578:web:30ae8ef3765e1db97c7e03",
  measurementId: "G-D0552DZ47M",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
