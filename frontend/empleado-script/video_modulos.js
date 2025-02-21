function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {

    async function loadVideos() {

        const urlParams = new URLSearchParams(window.location.search);
        const id_modulo = urlParams.get('id_modulo');

        const modulo_titulo = document.getElementById("modulo_titulo");
        const modulo_descripcion = document.getElementById("modulo_descripcion");   

        const response = await fetch(`/empleado/getVideo/${id_modulo}`);
        const video = await response.json();

        const responseTitle = await fetch(`/empleado/getModulo/${id_modulo}`);
        const modulo = await responseTitle.json();

        modulo_titulo.innerHTML = `${capitalizeFirstLetter(modulo.data[0].titulo)}`;
        modulo_descripcion.innerHTML = `${capitalizeFirstLetter(modulo.data[0].descripcion)}`;

        const container = document.getElementById("video_contenedor");

        if (video.length === 0) {
            container.innerHTML = `
            <div style="height: 15em; display: flex; justify-content: center; align-items: center;"> 
                <h1 style="font-size: 3em"> No hay material disponibles. </h1> 
            </div>
            `
        } else {
            container.innerHTML =
                        `<video controls style="width: 100%; height: auto, display: block;">
                            <source src="${video[0].url}" type="video/mp4">
                            Tu navegador no soporta videos.
                        </video>`
        }
    }
    loadVideos()
});