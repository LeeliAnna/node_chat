

// query selector fonction mise a dispo par le navigateur
var button = document.querySelector(".send");
var input = document.querySelector(".msg");
var myName = "Gaëlle";
var serverUrl = "http://localhost:3000/addmessage";

var Stephan = "http://192.168.50.17:3000/addmessage";
var Lyst = "http://192.168.50.30:3000/addmessage";
var Manon = "http://192.168.50.24:3000/addmessage";
var Sam = "http://192.168.50.26:3000/addmessage";
var Nadine = "http://192.168.50.22:3000/addmessage";
var Irene = "http://192.168.50.19:3000/addmessage";
var Romane = "http://192.168.50.34:3000/addmessage";

// déclaration du socket (établit la connection serveur - client en HTTP et ensuite en WebSocket)
var socket = io();


button.addEventListener('click', function (evt) {
    var theMessage = input.value;
    input.value = "";
    //sendMessage(theMessage);
    socket.emit("newMessage", {user: myName, msg: theMessage});
});

socket.on('updated', function(data) {
    console.log(data);
    var chatArea = document.querySelector(".chat")
        chatArea.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            chatArea.innerHTML += '<div>' + data[i].user + ": " + data[i].msg + '</div>';
        }
});




// Code qui fonctionne avec express !!! remplacer par la gestion en webSocket
//CheckServer();

function sendMessage(msg) { // envoie du message vers le serveur
    console.log("Envois de données au serveur " + msg);
    var messageForServer = { user: myName, msg: msg };
    sendData(serverUrl, messageForServer)

}

function CheckServer() {
    console.log("checking server");
    
    getData(serverUrl);
    setTimeout(function() {
        CheckServer()
    }, 5000)
}

function addMessage(msg) {
    console.log("envoie de données" + msg);
}

function addMessageToChat(msg) {
    console.log(msg);
}

function addUser(user) {
    console.log(user);
}

function conectToServer(params) {
    console.log("Je me connecte");
}


async function sendData(url, msg) {
    //const url = url;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

async function getData(url) {
    //const url = url;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        var messages = JSON.parse(json)
        var chatArea = document.querySelector(".chat")
        chatArea.innerHTML = "";
        console.log(messages);
        
        for (let i = 0; i < json.length; i++) {
            chatArea.innerHTML += '<div>' + messages[i].user + ": " + messages[i].msg + '</div>';
            
        }
    } catch (error) {
        console.error(error.message);
    }
}