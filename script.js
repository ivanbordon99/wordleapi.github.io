let intentos = 5;
//let diccionario = ["ABETO", "ACTOR", "AGUAS", "AGUDO", "ALADO", "ALBAS", "ALTAR", "ANTON", "ATIZO", "AVALA", "AVION", "AZUL"];
//let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
let palabra;
let palabraAPI;
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const input = document.getElementById("guess-input");
const valor = input.value;
const GRID = document.getElementById("grid");
const ROW = document.createElement('div');
const API = "https://random-word-api.vercel.app/api?words=1&length=5";
ROW.className = 'row';
function intentar() {
    palabra = palabraAPI;
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    const INTENTO = leerIntento();
    ROW.className = 'row';
    if (INTENTO.length == 5) {
        for (let i in palabra) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabra[i]) { //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#1abc9c';

            } else if (palabra.includes(INTENTO[i])) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f1c40f';
            } else {      //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#434b4d';
            }
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW);
        if (INTENTO === palabra) {
            terminar("<h1 style='color: GREEN '>FELICIDADES, HAS GANADO</h1>");
            console.log("GANASTE!");
            return;
        }
        for (let i in palabra) {
            if (INTENTO[i] === palabra[i]) {
                console.log(INTENTO[i], "VERDE")
            } else if (palabra.includes(INTENTO[i])) {
                console.log(INTENTO[i], "AMARILLO")
            } else {
                console.log(INTENTO[i], "GRIS")
            }
        }
        intentos--
        if (intentos == 0) {
            console.log("PERDISTE!")
        }
        if (intentos == 0) {
            terminar("<h1 style='color: RED'>LO SIENTO, HAS PERDIDO</h1>");
        }
    }
    else if (INTENTO.length > 0 && INTENTO.length < 5) {

        alert("INGRESE UNA PALABRA DE CINCO LETRAS");
        
    }
    else if(INTENTO.length == 0){
        alert("INGRESE UNA PALABRA");
    }


}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {

    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
function alerta(mensaje) {
    /* const INPUT = document.getElementById("guess-input");
     const BOTON = document.getElementById("guess-button");*/
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}




window.addEventListener('load', init);
function init() {

    fetch(API).then((response) => {


        response.json().then((body) => {
            palabraAPI = body[0].toUpperCase();
        });

    }).catch((error) => {
        console.log(error);
    });




}




