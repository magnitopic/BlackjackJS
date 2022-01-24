// Montamos el canvas con alta resolución
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// Classe carta
class carta {
	// las variables static pertenece a la clase
	static x = 50;
	static y = 50;

	constructor(valor, palo) {
		this.img = new Image();
		this.valor = valor;
		this.palo = palo;
	}
}

// Variables que vamos a usar
var cartas = [];
var cartasJugador = [];
var cartasCrupier = [];
var indiceCarta = 0;
var palos = ["S", "H", "D", "C"];
// Generamos las cartas. Con atributos valor y palo
for (i = 0; i < 4; i++) {
	for (j = 1; j <= 13; j++) {
		cartas.push(new carta(j, palos[i]));
	}
}

//Barajamos las cartas
for (i = 0; i < 100; i++) {
	cartas.splice(Math.random() * 52, 0, cartas[0]);
	cartas.shift();
}

function dibujarCarta(CJ) {
	// Tenemos que primero cargar la carta y luego añadir el src
	// Si no las cartas no cargan en la pagina
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335);
		carta.x += 300;
	};
	// Para cargar la imagen correcta concatenamos el numero y el palo, que coincida con el nombre del fichero
	CJ.img.src = "imagenes/cartas/" + CJ.valor.toString() + CJ.palo + ".svg";
}

function pedirCarta() {
	// Ponemos un maximo de cartas que pueda sacar para que el crupier tambíen pueda sacar las suyas
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta]; //Carta Jugada
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
	}
}

function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
	let pointsUser = 0;
	let pointsCrupier = 0;
	let info = document.getElementById("info");
	// Contamos e imprimimos los puntos del jugador
	for (i in cartasJugador) {
		pointsUser += cartasJugador[i].valor;
	}
	// Sacamos cartas al crupier y contamos sus puntos
	while (pointsCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta]);
		pointsCrupier += cartas[indiceCarta].valor;
		indiceCarta++;
	}
	// Putos de la partida se ponen en info
	info.innerHTML = "Puntuación jugador: " + pointsUser + "<br>Puntuación crupier: " + pointsCrupier;
	// Dibujamos las cartas del crupier
	carta.x = 50;
	carta.y = 400;
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i]);
	}
	// Comprobamos ganador
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>Blackjack!!! Has ganado!</b>";
	} else if (pointsUser > 21) {
		info.innerHTML +="<br><b>Has perdido... Te has pasado de puntos</b>";
	} else if (pointsCrupier > 21) {
		info.innerHTML +="<br><b>Has ganado!!! El croupier se ha pasado de puntos</b>";
	} else if (pointsCrupier >= pointsUser) {
		info.innerHTML += "<br><b>Ha ganado el croupier...</b>";
	} else {
		info.innerHTML += "<br><b>Has ganado!!!</b>";
	}
}

//Recarga la pagina cuando se presiona el botton
function playagain() {
	location.reload(true);
}
