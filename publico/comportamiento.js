function desplegarMensaje(mensaje)
{
	const output = document.getElementById("mensajes");

	output.innerHTML += mensaje + "<br/><br/>";
}

function enviarMensaje()
{

	const input = document.getElementById("textoMensaje");
	const texto = input.value;

	if(texto.length == 0)
		alert("No se pueden enviar mensajes vacíos");

	socket.emit("enviar",texto); //Envia el mensaje por el socket

	input.value = "";
}

const socket = io().connect("http://localhost");

socket.on("connect", function(data){
	console.log("MI id Socket: " + this.id); //Agarra el id del socket
	socket.emit("Listo",""); 


	const boton = document.getElementById("botonMensaje");
	boton.addEventListener("click",enviarMensaje);
});

socket.on("recibir", function(data){
	desplegarMensaje(data);
});


