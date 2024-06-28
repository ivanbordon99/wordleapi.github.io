let intento = 0;
let fil = 0;
let letra = 0;
let ganado = false;
let perdido = false;

let espacios = document.querySelectorAll('.inpletter');
let matriz = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
let ids = [];



const API = "https://random-word-api.vercel.app/api?words=1&length=5";

let palabraActual = [];
let tecla;
let count = 0;
let hayLetra = false;
document.addEventListener('keydown', logKey);
const button = document.getElementById("guess-button");

function intentar() {
    
    palabra = palabraAPI;

    const INTENTO = leerIntento();

    let resultado = INTENTO.join("");
    for (let i in palabra) {
        if (INTENTO[i] === palabra[i]) { //VERDE
            matriz[fil][i] = 1;
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            matriz[fil][i] = 2;
        } else {      //GRIS
            matriz[fil][i] = 3;
        }
    }

    console.log(palabra);

    if (resultado === palabra) {
        ganado = true;
    }

    if (intento === 5) {
        perdido = true;
    }
    fil = fil + 1;
}

function leerIntento() {

    let intento = palabraActual;
    return intento;

}

function terminar(mensaje) {

    alert(mensaje);
    document.removeEventListener('keydown', logKey);


}

function gameOver(g, p) {

    if (g) {

        terminar("HAS GANADO");
        return;
    }

    if (p) {
        terminar("HAS PERDIDO, LA PALABRA ERA: " + palabra);
        location.reload();
        return;

    }


}


function pintar() {
    let x;
    let ids1 = [];
    let ids2 = [];
    let ids3 = [];
    let ids4 = [];
    let ids5 = [];
    count = 0;
    console.log("intento: " + intento);
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('l' + i);
        ids.push(x.id);
    }
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('c' + i);
        ids1.push(x.id);
    }
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('a' + i);
        ids2.push(x.id);
    }
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('b' + i);
        ids3.push(x.id);
    }
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('d' + i);
        ids4.push(x.id);
    }
    for (let i = 0; i < 5; i++) {
        x = document.getElementById('e' + i);
        ids5.push(x.id);
    }

    // Imprimir los elementos de la fila i de arriba hacia abajo
    for (let j = 0; j < 5; j++) {
        let ficha;
        if (intento === 0) {


            ficha = document.getElementById(ids[j]);


        }
        if (intento === 1) {


            ficha = document.getElementById(ids1[j]);


        }
        if (intento === 2) {


            ficha = document.getElementById(ids2[j]);


        }
        if (intento === 3) {


            ficha = document.getElementById(ids3[j]);


        }
        if (intento === 4) {


            ficha = document.getElementById(ids4[j]);


        }
        if (intento === 5) {


            ficha = document.getElementById(ids5[j]);


        }
        if (matriz[intento][j] === 1) {


            console.log(ficha.id + ": verde");
            ficha.style.backgroundColor = "#009432";
            ficha.style.borderColor = "#009432";
            ficha.style.webkitTextStroke = "1px black";
            ficha.style.color = "white";


        }
        if (matriz[intento][j] === 2) {

            console.log(ficha.id + ": amarillo");
            ficha.style.backgroundColor = "yellow";
            ficha.style.borderColor = "yellow";
            ficha.style.webkitTextStroke = "1px black";
            ficha.style.color = "white";

        }
        if (matriz[intento][j] === 3) {

            console.log(ficha.id + ": gris");
            ficha.style.backgroundColor = "#808e9b";
            ficha.style.borderColor = "#808e9b";
            ficha.style.webkitTextStroke = "1px black";
            ficha.style.color = "white";

        }
        if (matriz[intento][j] === undefined) {

            console.log(ficha.id + ": normal");
            ficha.style.backgroundColor = "#eed09d";
            ficha.style.borderColor = "#eed09d";

        }


    }
    console.log("---------------------------------------------------------");
}
function borrar(params) {

    //BORRAR//////////////////////////////////////////



    // Selecciona todos los divs con la clase 'inpletter'
    if (count > 0) {


        count = count - 1;

    }


    // Recorre los divs en orden inverso y encuentra el último que tenga una letra
    for (let i = espacios.length - 1; i >= 0; i--) {
        if (espacios[i].textContent !== '') {
            espacios[i].textContent = ''; // Elimina la letra
            break;
        }
    }


}





function logKey(event) {



    tecla = event.key.toUpperCase(); //captura la tecla presionada y la pone en mayuscula
    let espacioVacio = document.querySelector('.inpletter:empty');
    if (espacioVacio && /^[A-Z]$/.test(tecla)) { // Verifica que sea una letra de la A a la Z
        if (count < 5) {

            espacioVacio.textContent = tecla;
            palabraActual.splice(count, 1, tecla);
            hayLetra = true;
            count = count + 1;


        }



    }
    else if (event.key === 'Backspace' && count > 0) {

        borrar();


    }


    else if (event.key === 'Enter' && count === 5) {

        intentar();
        pintar();

        intento++;



    }

    else if (count < 5) {


        alert("Ingrese una palabra de 5 letras");
    }

    setTimeout(gameOver(ganado, perdido), 5000);



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


