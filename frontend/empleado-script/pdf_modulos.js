function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {

        const urlParams = new URLSearchParams(window.location.search);
        const id_modulo = urlParams.get('id_modulo');
        const dni = urlParams.get('dni');

        const inputdiv = document.getElementById("inputdiv");
        inputdiv.setAttribute("id", `pdfInput${id_modulo}`);
        const buttonEnviar = document.getElementById("enviarPdf");
        buttonEnviar.setAttribute("onclick", `subirPdf(${id_modulo}, ${dni})`);

    async function loadPdfs() {

        const modulo_titulo = document.getElementById("modulo_titulo");
        //const modulo_descripcion = document.getElementById("modulo_descripcion");   

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

        const response2 = await fetch(`/empleado/pdf/${id_modulo}&${dni}`);
        const pdf2 = await response2.json();

        const contenedorFormResol = document.getElementById("contenedorFormResol");
        contenedorFormResol.innerHTML = ``

        if (response2.ok && pdf2.length > 0) {
            contenedorFormResol.innerHTML = `
                <!-- <div> Ya existe material para este modulo.</div> -->
                <button type="button" onclick="eliminarPdf(${id_modulo},${dni})" >Eliminar Pdf</button>
            `
        } else {
            contenedorFormResol.innerHTML = `
            <input type="file" id="pdfInput${id_modulo}" accept="application/pdf" required>
            <button type="button" onclick="subirPdf(${id_modulo}, ${dni})">Subir PDF</button>
        `
        }
    }
    loadPdfs()
});


async function subirPdf(id_modulo, dni) {
    //const urlParams = new URLSearchParams(window.location.search);
    //const dni = urlParams.get('dni');
    
    const fileInput = document.getElementById(`pdfInput${id_modulo}`);
    const file = fileInput.files[0];

    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("id_modulo", id_modulo);
    formData.append("dni", dni);

    try {
        response = await fetch("http://localhost:3000/empleado/uploadpdf", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        console.error("Error en la subida:", error);
    }
}
    

async function eliminarPdf(id_modulo, dni) {
    try {
        const response = await fetch(`/empleado/pdf/${id_modulo}&${dni}`, {
            method: "GET",
        });

        const result = await response.json();

        if (response.ok && result.length > 0) {
            const pdf = result[0];
            const responseDelete = await fetch(`http://localhost:3000/empleado/deletePdf/${pdf.id_evaluacion_empleado}`, {
                method: "DELETE",
            });

            if (!responseDelete.ok) {
                throw new Error("Error al eliminar el pdf");
            }
        } else {
            console.log("No hay pdf para este modulo");
        }

    } catch (error) {
        console.error("Error en la eliminación:", error);
    }
}