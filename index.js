// console.log("Coucou, c'est moi Cococinelle!");
// console.log("Nooooooo, Coupine dirait : 'Coucou, tu veux voir ma bite?!'");

// Import du module de ES Module via Node
// ES Module est une librairie permettant de faire une connection HTTP
import http from 'http';
import express from 'express';
import cors from 'cors';
// import de la librairie permettant le webSocket
import {Server} from 'socket.io';


// import du module et création de la variable via CommonJS
//const http = require('http');
// donner le nom de localhost
//const hostname = '127.0.0.1';
// ouvretur d'un port particulier
const port = 3000;
var list = [];
var localDB = [];

// configuration des requetes et reponses du serveur
// const server = http.createServer(
// (req, res) => {
//     res.statusCode = 200;
//     // methode setHeader() ce qu'on va modifier et comment il sera modifier
//     res.setHeader('Content-Type', 'text/plain');
//     console.log("intrusioooonnnn");    
//     list.push(req.socket.remoteAddress);
//     console.log(list.length);
    
//     res.end('Hello world Gaelle');
// });

// const serve = http.createServer(fonction (req, res){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end("Hello");
// })

// création d'un server express qui va gerer les requetes HTTP
const app = express();
// crée un server qui va utiliser express pour la gestion des configurations
const server = http.createServer(app);
// crétion d'un server IO qui va permettre de gerer le WebSocket, il va cosomer le server express pour effectuer le 1er connection
const io = new Server(server)

app.use(cors());
// permet de traiter des messages entrant au format JSON 
// checker que les données entrentes on ete traiter dans l'url
app.use(express.urlencoded({extended: true})); 
// To parse the incoming requests with JSON payloads
// permet de formater les données au format Json
app.use(express.json());

// configuration d'une route ayant pour nom '/static' vers un sous dossier (il y prendra le fichier index.html par defaut)
app.use('/static', express.static('public'))

//pemettre au serveur de savoir qu'un socket est connecter dessus
io.on('connection', function (socket) {
    console.log("un socket connecté");
    console.log(socket.id);
    // connaitre adresse IP du client
    console.log(socket.handshake.remoteAddress);
    // récuperer l'evenemnt qui envoie le message
    socket.on("newMessage", function(data) {
        console.log(data);
        // push le message dans la DB
        localDB.push(data);
        // retourne la DB
        io.emit('updated', localDB);
    })

})

app.route('/addmessage').post(function(req, res) {
    console.log(req.socket.remoteAddress);
    console.log(req.body);
    if (req.body.user && req.body.msg){
        localDB.push(req.body);
    }
}).get(function(req, res) {
    res.json(JSON.stringify(localDB))
});

// configuration de la racine du serveur web
app.get('/', function(req, res) {
    res.send('<h1> Coucou les coupines <3 </h1>')
})
// configurer la route test
app.get('/test/', function(req, res) {
    res.send('<p>ceci est un test</p>')
});

server.listen(port,function(){
    console.log(`serveur en execution`);
    
});