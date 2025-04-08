import "./style.css";

let puntuacion: number = 0;

const mensajeGameOver = document.getElementById("game-over");
const botonNuevoJuego = document.getElementById("new-game");
const boton = document.getElementById("order-card");
const botonPlantarse = document.getElementById("stand");
const mensajePlantarse = document.getElementById("mensaje-plantarse");

function muestraPuntuacion(): void {
    const scoreElement = document.getElementById("score");
    if (scoreElement !== null && scoreElement instanceof HTMLElement) {
        scoreElement.textContent = puntuacion.toString();
    }
}

function obtenerPuntosCarta(carta: number) {
    return carta > 7 ? 0.5 : carta;
}

function actualizaPuntuacion(nuevosPuntos: number) {
    puntuacion = nuevosPuntos;
}

function sumaPuntuacion(puntos: number): number {
    return puntuacion + puntos;
}

function mostrarGameOver(): void {
    if (mensajeGameOver instanceof HTMLElement && botonNuevoJuego instanceof HTMLButtonElement) {
        mensajeGameOver.textContent = "Game Over";
        mensajeGameOver.style.display = "block";
        botonNuevoJuego.style.display = "inline-block";
    }
}

function bloquearBotones(): void {
    if (boton instanceof HTMLButtonElement && botonPlantarse instanceof HTMLButtonElement) {
        boton.disabled = true;
        botonPlantarse.disabled = true;
    }
}

function activarBotones(): void {
    if (boton instanceof HTMLButtonElement && botonPlantarse instanceof HTMLButtonElement) {
        boton.disabled = false;
        botonPlantarse.disabled = false;
    }
}

function revisarPartida() {
    if (puntuacion > 7.5) {
        mostrarMensaje("Game Over");
        mostrarGameOver();
        bloquearBotones();
    } else if (puntuacion === 7.5) {
        mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
        mostrarGameOver(); 
        bloquearBotones();
    }
}

function mostrarMensajePlantarse(): void {
    if (puntuacion < 4) {
        mostrarMensaje("Has sido muy conservador");
    } else if (puntuacion === 5) {
        mostrarMensaje("Te ha entrado el canguelo eh?");
    } else if (puntuacion >= 6 && puntuacion < 7) {
        mostrarMensaje("Casi casi...");
    } else if (puntuacion === 7.5) {
        mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
    }
}

function mostrarMensaje(mensaje: string) {
    const mensajePlantarse = document.getElementById("mensaje-plantarse");
    if (mensajePlantarse instanceof HTMLDivElement) {
        mensajePlantarse.textContent = mensaje;
        mensajePlantarse.style.display = "block";
    }
}

const dameNumeroAleatorio = () => Math.floor(Math.random() * 10) + 1;

const dameNumeroCarta = (numero: number) => (numero > 7 ? numero + 2 : numero);

const mostrarUrlCarta = (urlCarta: string) => {
    const cardImage = document.getElementById("card-image");
    if (cardImage instanceof HTMLImageElement) {
        cardImage.src = urlCarta;
    }
};

function dameCarta(): void {
    const numeroAleatorio = dameNumeroAleatorio();
    const carta = dameNumeroCarta(numeroAleatorio);
    const urlCarta = obtenerUrlCarta(carta);
    mostrarUrlCarta(urlCarta);
    const puntosCarta = obtenerPuntosCarta(carta);
    const puntosSumados = sumaPuntuacion(puntosCarta);
    actualizaPuntuacion(puntosSumados);
    muestraPuntuacion();
    revisarPartida();
}

function plantarse() {
    mostrarMensajePlantarse();
    bloquearBotones();
    if (botonNuevoJuego instanceof HTMLButtonElement) {
        botonNuevoJuego.style.display = "inline-block";
    }
}

function obtenerUrlCarta(number: number): string {
    switch (number) {
        case 1: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
        case 2: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
        case 3: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
        case 4: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
        case 5: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
        case 6: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
        case 7: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
        case 10: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
        case 11: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
        case 12: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
        default: return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    }
}

function ocultarMensajes(): void {
    if (mensajeGameOver instanceof HTMLElement) {
        mensajeGameOver.style.display = "none";
    }

    if (mensajePlantarse instanceof HTMLDivElement) {
        mensajePlantarse.style.display = "none";
    }
}

function iniciarNuevaPartida(): void {
    puntuacion = 0;
    muestraPuntuacion();
    ocultarMensajes();
    activarBotones();

    if (botonNuevoJuego instanceof HTMLButtonElement) {
        botonNuevoJuego.style.display = "none";
    }

    mostrarUrlCarta("https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg");
}

if (boton instanceof HTMLButtonElement) {
    boton.addEventListener("click", dameCarta);
}

if (botonPlantarse instanceof HTMLButtonElement) {
    botonPlantarse.addEventListener("click", plantarse);
}

if (botonNuevoJuego instanceof HTMLButtonElement) {
    botonNuevoJuego.addEventListener("click", iniciarNuevaPartida);
}

document.addEventListener("DOMContentLoaded", iniciarNuevaPartida);
