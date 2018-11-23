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

var ref = firebase.database().ref();                           
ref.on("value", function(snapshot){
    output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
});
