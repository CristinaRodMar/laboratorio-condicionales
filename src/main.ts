import "./style.css";

let puntuacion: number = 0;
const boton = document.getElementById("order-card") as HTMLButtonElement;
const mensajeGameOver = document.getElementById("game-over") as HTMLElement;
const botonPlantarse = document.getElementById("stand") as HTMLButtonElement;
const mensajePlantarse = document.getElementById("mensaje-plantarse") as HTMLElement;
const botonNuevoJuego = document.getElementById("new-game") as HTMLButtonElement;

function muestraPuntuacion(): void {
    document.getElementById("score")!.textContent = puntuacion.toString();
}

function sumaPuntuacion(carta: number): void {
    if (carta === 10 || carta === 11 || carta === 12) {
        puntuacion += 0.5;
    } else {
        puntuacion += carta;
    }

    muestraPuntuacion();

    if (puntuacion > 7.5) {
        mostrarGameOver();
        bloquearBoton();
    }
}

function mostrarGameOver(): void {
    mensajeGameOver.textContent = "Game Over";
    mensajeGameOver.style.display = "block";
    botonNuevoJuego.style.display = "inline-block";
}

function bloquearBoton(): void {
    boton.disabled = true;
    botonPlantarse.disabled = true;
}

function mostrarMensajePlantarse(): void {
    if (puntuacion < 4) {
        mensajePlantarse.textContent = "Has sido muy conservador";
    } else if (puntuacion === 5) {
        mensajePlantarse.textContent = "Te ha entrado el canguelo eh?";
    } else if (puntuacion >= 6 && puntuacion < 7) {
        mensajePlantarse.textContent = "Casi casi...";
    } else if (puntuacion === 7.5) {
        mensajePlantarse.textContent = "¡Lo has clavado! ¡Enhorabuena!";
    }
    mensajePlantarse.style.display = "block";
    botonNuevoJuego.style.display = "inline-block";
}

function dameCarta(): number {
    let carta: number = Math.floor(Math.random() * 10) + 1;

    if (carta > 7) {
        carta += 2;
    }

    console.log("Carta obtenida:", carta);
    return carta;
}

boton.addEventListener("click", () => {
    let carta: number = dameCarta();
    const cardImage = document.getElementById("card-image") as HTMLImageElement;
    cardImage.src = mostrarCarta(carta);
    muestraPuntuacion();
    sumaPuntuacion(carta);
});

botonPlantarse.addEventListener("click", () => {
    mostrarMensajePlantarse();
    bloquearBoton();
});

function mostrarCarta(number: number): string {
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

function iniciarNuevaPartida(): void {
    puntuacion = 0;
    muestraPuntuacion();

    mensajeGameOver.style.display = "none";
    mensajePlantarse.style.display = "none";

    boton.disabled = false;
    botonPlantarse.disabled = false;

    botonNuevoJuego.style.display = "none";
}

botonNuevoJuego.addEventListener("click", () => {
    iniciarNuevaPartida();
});
