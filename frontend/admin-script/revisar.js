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
        const id_empleado = urlParams.get('id_empleado');

        const modulo_titulo = document.getElementById("modulo_titulo");

        const response = await fetch(`/admin/revisarAdmin/${id_empleado}&${id_modulo}`);
        const pdf = await response.json();

        const responseTitle = await fetch(`/empleado/getModulo/${id_modulo}`);
        const modulo = await responseTitle.json();

        modulo_titulo.innerHTML = `Evaluacion del modulo: ${capitalizeFirstLetter(modulo.data[0].titulo)}`;
        const container = document.getElementById("pdf_contenedor");
        if (pdf.length === 0) {
            container.innerHTML = `
            <div style="height: 15em; display: flex; justify-content: center; align-items: center;"> 
                <h1 style="font-size: 3em"> El usuario no ha cargado su evaluacion aun </h1>
            </div>
            `
        } else {
            container.innerHTML =`
                <iframe src="${pdf[0].url}" width="100%" height="100%" style="border: none;" class="rounded-lg"></iframe>
                `
        }
        const label = document.getElementById("label");
        const input = document.getElementById("input");
        const buttonNota = document.getElementById("buttonNota");
        label.setAttribute("id", `label${id_empleado}${id_modulo}`);
        input.setAttribute("id", `input${id_empleado}${id_modulo}`);
        buttonNota.setAttribute("id", `buttonNota${id_empleado}${id_modulo}`);
        buttonNota.setAttribute("onclick", `calificar('${id_empleado}', ${id_modulo})`);
    }
    loadPdfs()
});

function calificar(id_empleado, id_modulo) {
    const input = document.getElementById(`input${id_empleado}${id_modulo}`);
    const puntuacion = input.value;

    fetch(`/admin/calificarAdmin/${id_empleado}&${id_modulo}&${puntuacion}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({puntuacion})
    })
    .then(response => {
        if (response.ok) {
            alert("Nota guardada correctamente");
            location.reload();
        } else {
            alert("Error al guardar la nota");
        }
    })
}