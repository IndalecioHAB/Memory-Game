"use strict";

let emojis = ['🍊', '🍌', '🍓', '🍎', '🥕', '🍆', '🥦', '🥒'];
let juego = {
    cartasReveladas: [],
    bloqueo: false  // Agregar esta propiedad para manejar el bloqueo de clics
};

const mostrarEmojis = () => {
    emojis.forEach((data) => {
        const obtenerDiv = document.getElementById('frutas');
        const div = document.createElement('div');
        div.innerHTML=
        `
        <p>${data}</p>

        `
        obtenerDiv.appendChild(div); 
    });
}
mostrarEmojis();

const eventoClick = () => {
    const cards = document.querySelectorAll(".card");

    const reveal = (e) => {
        if (juego.bloqueo) return;  // No hacer nada si se está procesando una comparación anterior
        const currentCard = e.currentTarget;
        if (currentCard.classList.contains("flipped") || currentCard.classList.contains("fixed")) return;  // No hacer nada si la carta ya está volteada o fija
        currentCard.classList.add("flipped");

        // Obtener el emoji asociado a la carta clicada
        const emoji = currentCard.querySelector('.emoji').textContent;

        juego.cartasReveladas.push({ card: currentCard, emoji });

        if (juego.cartasReveladas.length === 2) {
            // Desactivar clics mientras se procesa la comparación
            juego.bloqueo = true;

            // Comparar emojis de las dos cartas reveladas
            if (juego.cartasReveladas[0].emoji === juego.cartasReveladas[1].emoji) {
                // Si los emojis son iguales, dejar las cartas fijas
                setTimeout(() => {
                    juego.cartasReveladas.forEach(({ card }) => card.classList.add("fixed"));
                    juego.cartasReveladas = [];
                    juego.bloqueo = false;  // Reactivar clics
                }, 1000);
            } else {
                // Si los emojis son diferentes, volver a ocultar las cartas
                setTimeout(() => {
                    juego.cartasReveladas.forEach(({ card }) => card.classList.remove("flipped"));
                    juego.cartasReveladas = [];
                    juego.bloqueo = false;  // Reactivar clics
                }, 1000);
            }
        }
    };

    for (const card of cards) {
        card.addEventListener("click", reveal);
    }
};

eventoClick();

const posicionAleatoria = () => {
    const backs = document.querySelectorAll(".back");

    // Duplicar la lista de emojis para asegurarnos de tener pares para cada emoji
    const emojisDuplicados = [...emojis, ...emojis];

    for (const back of backs) {
        const nuevoDiv = document.createElement('p');
        nuevoDiv.className = 'emoji';

        // Generar un número aleatorio y asignarlo como contenido del div
        const numeroAleatorio = Math.floor(Math.random() * emojisDuplicados.length);

        nuevoDiv.textContent = emojisDuplicados[numeroAleatorio];

        // Eliminar el emoji utilizado para evitar duplicados
        emojisDuplicados.splice(numeroAleatorio, 1);

        // Añadir el nuevo div al contenedor
        back.appendChild(nuevoDiv);
    }
}

posicionAleatoria();
