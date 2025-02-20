document.addEventListener("DOMContentLoaded", function() {
    async function loadVideos() {

        const urlParams = new URLSearchParams(window.location.search);
        const id_modulo = urlParams.get('id_modulo');

        const response = await fetch(`/empleado/getVideo/${id_modulo}`);
        const video = await response.json();
        console.log(video)
        console.log(video[0].url)
        const container = document.getElementById("video_contenedor");
        container.innerHTML =
            `<video controls style="width: 100%; height: auto, display: block;">
                <source src="${video[0].url}" type="video/mp4">
                Tu navegador no soporta videos.
            </video>`
    }
    loadVideos()
});