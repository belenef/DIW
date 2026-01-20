function redimensionaBarra() {
    if (!medio.ended) {
        var total = parseInt(medio.currentTime * maximo / medio.duration);
        progreso.style.width = total + 'px';
    } else {
        progreso.style.width = '0px';
        play.value = '\u25BA';
        window.clearInterval(bucle);
    }
}

function desplazarMedio(e) {
    if (!medio.paused && !medio.ended) {
        var ratonX = e.pageX - barra.offsetLeft;
        var nuevoTiempo = ratonX * medio.duration / maximo;
        medio.currentTime = nuevoTiempo;
        progreso.style.width = ratonX + 'px';
    }
}

// Funciones de botones
function accionPlay() {
    if (!medio.paused && !medio.ended) {
        medio.pause();
        play.value = '\u25BA';
        window.clearInterval(bucle);
    } else {
        medio.play();
        play.value = '||';
        bucle = setInterval(redimensionaBarra, 1000);
    }
}

function accionPause() {
    medio.pause();
}

function accionStop() {
    medio.pause();
    medio.currentTime = 0;
    redimensionaBarra();
}

// Función que reemplaza actualizarBarra
function actualizarBarra() {
    redimensionaBarra();
}

function iniciar() {
    maximo = 700;

    medio = document.getElementById('medio');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');

    play = document.getElementById('play');
    reiniciar = document.getElementById('reiniciar');
    retrasar = document.getElementById('retrasar');
    adelantar = document.getElementById('adelantar');
    silenciar = document.getElementById('silenciar');
    menosVolumen = document.getElementById('menosVolumen');
    masVolumen = document.getElementById('masVolumen');

    // Barra de progreso
    barra.addEventListener('click', desplazarMedio, false);
    medio.addEventListener('timeupdate', actualizarBarra, false);

    // Botones
    play.addEventListener('click', accionPlay, false);

    reiniciar.addEventListener('click', () => {
        medio.currentTime = 0;
        medio.pause();
        play.value = "▶";
        redimensionaBarra();
    });

    retrasar.addEventListener('click', () => {
        medio.currentTime -= 5;
        if (medio.currentTime < 0) medio.currentTime = 0;
    });

    adelantar.addEventListener('click', () => {
        medio.currentTime += 5;
        if (medio.currentTime > medio.duration) medio.currentTime = medio.duration;
    });

    silenciar.addEventListener('click', () => {
        medio.muted = !medio.muted;
        silenciar.value = medio.muted ? "activar" : "silenciar";
    });

    menosVolumen.addEventListener('click', () => {
        medio.volume = Math.max(0, medio.volume - 0.1);
    });

    masVolumen.addEventListener('click', () => {
        medio.volume = Math.min(1, medio.volume + 0.1);
    });
}

window.addEventListener('load', iniciar, false);
