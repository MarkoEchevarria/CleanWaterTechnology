function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {

    async function loadPdfs() {

        const urlParams = new URLSearchParams(window.location.search);
        const id_modulo = urlParams.get('id_modulo');

        const modulo_titulo = document.getElementById("modulo_titulo");
        // const modulo_descripcion = document.getElementById("modulo_descripcion");   

        const response = await fetch(`/empleado/getPdf/${id_modulo}`);
        const pdf = await response.json();

        const responseTitle = await fetch(`/empleado/getModulo/${id_modulo}`);
        const modulo = await responseTitle.json();

        modulo_titulo.innerHTML = `Evaluacion del modulo: ${capitalizeFirstLetter(modulo.data[0].titulo)}`;
        //modulo_descripcion.innerHTML = `${capitalizeFirstLetter(modulo.data[0].descripcion)}`;

        const container = document.getElementById("pdf_contenedor");
        
        if (pdf.length === 0) {
            container.innerHTML = `
            <div style="height: 15em; display: flex; justify-content: center; align-items: center;"> 
                <h1 style="font-size: 3em"> No hay Evaluacion disponible. </h1>
            </div>
            `
        } else {
            container.innerHTML =`
                <iframe src="${pdf[0].url}" width="100%" height="100%" style="border: none;" class="rounded-lg"></iframe>
                `
        }
    }
    loadPdfs()
});