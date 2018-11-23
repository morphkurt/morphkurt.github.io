// Initialize Firebase
var config = {
    apiKey: "AIzaSyAznzsmO8oDgp70bp0a6KLfRfxJbBSJrCg",
    authDomain: "test-d7a2d.firebaseapp.com",
    databaseURL: "https://test-d7a2d.firebaseio.com",
    projectId: "test-d7a2d",
    storageBucket: "test-d7a2d.appspot.com",
    messagingSenderId: "1047309579449"
};
firebase.initializeApp(config);

// getting the text value from the database
var bigOne = document.getElementById('bigOne');
var dbRef = firebase.database().ref().child('text');
dbRef.on('value', snap => bigOne.innerText = snap.val());
