var firebaseConfig = {
    apiKey: "AIzaSyAlFGoZEPc0rEYAYiUTnNYZmDbnkQdP20c",
    authDomain: "todo-app-25565.firebaseapp.com",
    databaseURL: "https://todo-app-25565.firebaseio.com",
    projectId: "todo-app-25565",
    storageBucket: "",
    messagingSenderId: "600592089866",
    appId: "1:600592089866:web:1535bd7732529489"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var email;
var password;
function gettingValueSignIn() {
    email = document.getElementById("email").value;
    password = document.getElementById('password').value;

}

function signIn() {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (res) {
            console.log("hi");
            window.location.href = "addData.html"
            // getData()
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        })
}

var fname;
var lname;
var Age;
function todoData() {
    fname = document.getElementById('Fname').value;
    lname = document.getElementById('Lname').value;
    Age = document.getElementById('age').value;
}
function setData() {
    event.preventDefault();
    let obj = {
        name: fname,
        lastName: lname,
        age: Age
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            database.ref().child(user.uid).child("wholeData").child("todoData").child(obj.name).set(obj);
            document.getElementById('Fname').value = "";
            document.getElementById('Lname').value = "";
            document.getElementById('age').value = "";
        } else {
            // No user is signed in.
        }
    });
}
function changePage() {
    window.location.href = "viewlist.html";
}
var database = firebase.database();
var email;
var password;
function personalInfo() {
    email = document.getElementById('signUpEmail').value;
    password = document.getElementById('signUpPassword').value;
}
function signUp() {
    event.preventDefault();
    let obj = {
        email: email,
        password: password
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (res) {
            database.ref().child(res.user.uid).child('personal Information').set(obj)
            window.location.href = "addData.html"
            // getData();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
}

var table = document.getElementById('data')
function getData() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            database.ref().child(user.uid).child("wholeData").child("todoData").on('value', function (snap) {
                if (snap.val()) {
                    table.innerHTML = `            <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    </tr>
                    `

                    var obj = Object.values(snap.val())
                    for (var i = 0; i < obj.length; i++) {
                        table.innerHTML +=
                            `<tr>
                        <td>${obj[i].name}</td>
                        <td>${obj[i].lastName}</td>
                        <td>${obj[i].age}</td>
                        <td><button name = "${obj[i].name}" onclick = "del()">delete</button></td>
                        <td><button name = "${obj[i].name}" onclick = "update()">update</button></td>
                        </tr>`
                    }
                }else{
                    table.innerHTML = ""
                }
            });
        } else {
            console.log("else");
        }
    });
}
function del() {
    var name = event.target.name;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            database.ref(user.uid).child('wholeData').child("todoData").child(name).remove()
        }
    })
}