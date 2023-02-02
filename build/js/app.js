document.addEventListener('DOMContentLoaded', function() {
    app();
})

function app() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= 12; i++) {

        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen de Galeria">
        `

        imagen.onclick = function() {
            agrandarImagen(i);
        }

        galeria.appendChild(imagen);

    }
}

function agrandarImagen(id) {
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
         <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen de Galeria">
    `

    // Crear Overlay
    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');
    overlay.appendChild(imagen);
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Boton para Cerrar Modal (Imagen Agrandada)
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);

    //Añadir overlay
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}