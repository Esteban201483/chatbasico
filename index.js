
const filesystem = require("fs");
const express = require("express");
const bodyParser = require("body-parser");


const app = express(); // Hace uso del framework Express
const http = require("http").createServer(app);
const io = require("socket.io")(http);


//Permite que los recursos puedan ser accedidos de forma pública 
const resources = require("path").join(__dirname + "/publico/"); 
app.use("", express.static(resources));

//Permite que los datos de los formularios sean capturados mediante solicitudes POST
const urlEncodedParser = bodyParser.urlencoded({extended : false});
app.use(urlEncodedParser);

const directorioPaginas = "/test/"; //TODO: Reestructurar proyecto
const puerto = 2021;


//Configura el websocket
io.on("connection",function(socket) {
	console.log("Un usuario se ha conectado al chat");
	socket.join("sala_general"); //Verificar que solo se conecte la primera vez

	socket.on("enviar", function(msg) 
	{
		/*socket.join(sesion.getId());
		sesion.agregarJugador(socket.id);

		console.log("cantidad jugadores: " + sesion.getCantidadJugadores());
	
		if(sesion.getCantidadJugadores() === jugadoresEsperados) //En este caso, espera que hayan  jugadores
			//broadcastPartida("Inicio",tablero,idJugadores);
			iniciarPartida(sesion);*/

		io.to("sala_general").emit("recibir",msg);
		
	});

	/*socket.on("recibir",function(msg)
	{

	});*/

});

io.on("disconnect",function(socket){

	console.log("Un usuario se ha desconetado del chat");
});




//Despliega la página de la Sala de espera
app.get("/chat", function(request,response){
	filesystem.readFile("chat.html", function(error, data){
		console.log(data);
		response.write(data);
		response.end();
	});
});

/////////////////////////////////////////

//Despliega el sitio en el puerto 80
http.listen(puerto, new function(){
	console.log("El sitio web ha sido desplegado en el puerto: " + puerto);   
});



