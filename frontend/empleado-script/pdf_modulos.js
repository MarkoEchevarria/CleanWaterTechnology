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

        //const inputdiv = document.getElementById("inputdiv");
        //inputdiv.setAttribute("id", `pdfInput${id_modulo}`);
        //const buttonEnviar = document.getElementById("enviarPdf");
        //buttonEnviar.setAttribute("onclick", `subirPdf(${id_modulo}, ${dni})`);

        const RegresarButton = document.getElementById("RegresarButton");
        RegresarButton.setAttribute("onclick", `volverModulos(${id_modulo},${dni})`);

    async function loadPdfs() {

        const modulo_titulo = document.getElementById("modulo_titulo");

        const response = await fetch(`/empleado/getPdf/${id_modulo}`);
        const pdf = await response.json();

        const responseTitle = await fetch(`/empleado/getModulo/${id_modulo}`);
        const modulo = await responseTitle.json();

        modulo_titulo.innerHTML = `Evaluacion del modulo: ${capitalizeFirstLetter(modulo.data[0].titulo)}`;

        const container = document.getElementById("pdf_contenedor");
        
        if (pdf.length === 0) {
            container.innerHTML = `
            <div style="height: 15em; display: flex; justify-content: center; align-items: center;"> 
                <h1 style="font-size: 3em"> No hay Evaluacion disponible. </h1>
            </div>
            `
        } else {
            container.innerHTML =` <iframe src="${pdf[0].url}" width="100%" height="100%" style="border: none;" class="rounded-lg"></iframe> `
        }

        const response2 = await fetch(`/empleado/pdf/${id_modulo}&${dni}`);
        const pdf2 = await response2.json();

        const contenedorFormResol = document.getElementById("contenedorFormResol");
        contenedorFormResol.innerHTML = ``

        const response3 = await fetch(`/empleado/getPdf/${id_modulo}`);
        const pdf3 = await response3.json();
        if ((pdf3[0]) && (pdf3[0].url)) {
            if (response2.ok && pdf2.length > 0) {
                if (response2.ok && pdf2[0].puntuacion) {
                    contenedorFormResol.innerHTML = `
                        <div style="height: 2em; display: flex; justify-content: center; align-items: center;">
                            <h1 style="font-size: 1.5em"> La calificacion de tu examen es: ${pdf2[0].puntuacion} </h1>
                        </div>
                    `
                } else {
                    contenedorFormResol.innerHTML = `
                        <button type="button" onclick="eliminarPdf(${id_modulo},${dni})" style="background-color: #ff4141; height: 34px; width: 100px; border-radius: 5px;">Eliminar Examen</button>
                    `
                }
                
            } else {
                contenedorFormResol.innerHTML =
                `
                <label for="pdfInput${id_modulo}" class="custom-file-upload" style="background-color: rgba(255, 234, 2, 0.87); margin-right: 2em ;color: black; padding: 8px 12px; cursor: pointer; border-radius: 5px; display: inline-block; text-align: center;">
                    Subir Resolucion
                </label>
                <input type="file" id="pdfInput${id_modulo}" accept="application/pdf" required style="display: none;">
                <button type="button" onclick="subirPdf(${id_modulo}, ${dni})" style="background-color: #4CAF50; height: 34px; width: 100px; border-radius: 5px;">Enviar Resolucion</button>
                `
            }
        } else { 
            contenedorFormResol.innerHTML = `
            <div style="height: 2em; display: flex; justify-content: center; align-items: center;">
                <h1 style="font-size: 1.5em"> No puedes enviar tu desarrollo, aun no se ha subido el examen. </h1>
            </div>
            `
        }

        
    }
    loadPdfs()
});

async function subirPdf(id_modulo, dni) {
    const fileInput = document.getElementById(`pdfInput${id_modulo}`);
    const file = fileInput.files[0];

    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("id_modulo", id_modulo);
    formData.append("dni", dni);

    try {
        response = await fetch("/empleado/uploadpdf", {
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
            const responseDelete = await fetch(`/empleado/deletePdf/${pdf.id_evaluacion_empleado}`, {
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

async function volverModulos(id_modulo, dni) {
    try {
        const response = await fetch(`/empleado/getCursoByModulo/${id_modulo}`);
        const result = await response.json();
        const id_curso = result.data[0].id_curso;

        const response2 = await fetch(`/empleado/volverModulos/${id_curso}&${dni}`);
        if (response2.ok) {
            const result2 = await response2.json();
            if (result2.redirectTo) {
                window.location.href = result2.redirectTo;
            } else {
                console.log("No se pudo redirigir");
            }
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}