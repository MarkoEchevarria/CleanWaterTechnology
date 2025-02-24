function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarCursosModulos() {
        try {
            const response = await fetch("/admin/showCursos");
            const data_cursos = await response.json();
            const main_modulos = document.getElementById("main-modulos");
            const listaModulos = document.getElementById("subcontenedor-modulos");
            const noModulosMensaje = document.getElementById("no-modulos-mensaje");

            if (response.ok && data_cursos.data && data_cursos.data.length > 0) {
                listaModulos.innerHTML = "";
                noModulosMensaje.style.display = "none";
                main_modulos.style.display = "block";

                for (const curso of data_cursos.data) {
                    const curso_head = document.createElement("div");
                    curso_head.setAttribute("class", `subcontenedor`);
                    curso_head.setAttribute("id", "subcontendor-modulos");
                    curso_head.innerHTML = `
                        <section>
                            <h3>${capitalizeFirstLetter(curso.nombre)}</h3>
                            <p>${curso.descripcion}</p>
                        </section>
                    `;
                    curso_head.innerHTML += `<div id="desplegar" onclick='desplegar("${curso.id_curso}")' style="text-align: center; display: block; display: flex; justify-content: center; align-items: center;" > <div style="font-size: 3em; border-radius: 30px; background: #99d5dc; height: 50px; width: 50px" > + </div> </div>`;
                    const response_modulo = await fetch(`/admin/showModulos/${curso.id_curso}`);
                    const modulos = await response_modulo.json();
                    if (modulos.data.length > 0) {
                        modulos.data.forEach( async (modulo) => {
                            const moduloDiv = document.createElement("div");
                            moduloDiv.classList.add("modulo", `modulo-${curso.id_curso}`);
                            moduloDiv.style.display = "none";
                            moduloDiv.innerHTML = `
                                <h4 class="titulo-modulo" style="flex-shrink: 0; flex-basis: 15%; text-align: center !important;"> ${modulo.titulo} </h4>
                                <div class="descripcion-modulo" style="flex-shrink: 0; flex-basis: 20%;  text-align: center !important;"> ${modulo.descripcion} </div>
                                <div class="contador" style="flex-shrink: 0; flex-basis: 15%;  text-align: center !important; margin: 3px" > Num Inscritos: 0 </div>
                            `
                            const response_video = await fetch(`/admin/video/${modulo.id_modulo}`);
                            const data_video = await response_video.json();

                            const videoDiv = document.createElement("form");
                            videoDiv.setAttribute("id", "uploadForm");
                            videoDiv.setAttribute("style", "flex-shrink: 0; flex-basis: 20%; display: flex; align-items: center; justify-content: center;");

                            if (data_video.length > 0) {
                                videoDiv.innerHTML = `
                                    <!-- <div> Ya existe material para este modulo.</div> -->
                                    <button type="button" onclick="eliminarVideo(${modulo.id_modulo})" >Eliminar Video</button>
                                    `;
                                    moduloDiv.appendChild(videoDiv);
                            } else {
                                videoDiv.innerHTML = 
                                    `
                                    <label for="videoInput${modulo.id_modulo}" class="custom-file-upload" style="background-color: #eeeeef; color: black; padding: 8px 12px; cursor: pointer; border-radius: 5px; display: inline-block;">
                                        Elegir Video
                                    </label>
                                    <input type="file" id="videoInput${modulo.id_modulo}" accept="video/*" required style="display: none;">
                                    <button type="button" onclick="subirVideo(${modulo.id_modulo})">Subir Video</button>
                                    `
                            }
                            const response_pdf = await fetch(`/admin/pdf/${modulo.id_modulo}`);
                            const data_pdf = await response_pdf.json();

                            const pdfDiv = document.createElement("form");
                            pdfDiv.setAttribute("id", "uploadForm");
                            pdfDiv.setAttribute("style", "flex-shrink: 0; flex-basis: 20%; display: flex; align-items: center; justify-content: center;");

                            if (data_pdf.length > 0) {
                                pdfDiv.innerHTML = `
                                    <!-- <div> Ya existe material para este modulo.</div> -->
                                    <button type="button" onclick="eliminarPdf(${modulo.id_modulo})" > Eliminar Examen </button>
                                    `;
                                    moduloDiv.appendChild(pdfDiv);
                            } else {
                                pdfDiv.innerHTML = 
                                `
                                    <label for="videoInput${modulo.id_modulo}" class="custom-file-upload" style="background-color: #eeeeef; color: black; padding: 8px 12px; cursor: pointer; border-radius: 5px; display: inline-block; text-align: center;">
                                        Elegir Examen
                                    </label>
                                    <input type="file" id="videoInput${modulo.id_modulo}" accept="video/*" required style="display: none;">
                                    <button type="button" onclick="subirVideo(${modulo.id_modulo})">Subir Examen</button>
                                `
                            }
                            moduloDiv.appendChild(videoDiv);
                            moduloDiv.appendChild(pdfDiv)
                            curso_head.appendChild(moduloDiv);                           
                        });
                    } else {console.log('No hay modulos disponibles',modulos.data)}

                    listaModulos.appendChild(curso_head);
                };
            } else {
                listaModulos.innerHTML = "";
                main_modulos.style.display = "none";
                noModulosMensaje.style.display = "block";
                noModulosMensaje.textContent = "No hay módulos disponibles.";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            noModulosMensaje.style.display = "block";
            noModulosMensaje.textContent = "Hubo un error al cargar los módulos.";
        }
    }

    cargarCursosModulos();
    
});
function desplegar(id_curso) {
    var x = document.getElementsByClassName(`modulo-${id_curso}`);
    for (let a of x) {
        if (a.style.display === "none") {
            a.style.display = "flex";
        } else {
            a.style.display = "none";
        }
    }
}

async function subirVideo(id_modulo) {
    const fileInput = document.getElementById(`videoInput${id_modulo}`);
    const file = fileInput.files[0];
    if (!file) return alert("Selecciona un archivo");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("id_modulo", id_modulo);
    try {
        response = await fetch("/admin/upload", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        console.error("Error en la subida:", error);
    }
}

async function eliminarVideo(id_modulo) {
    try {
        const response = await fetch(`/admin/video/${id_modulo}`, {
            method: "GET",
        });
        const result = await response.json();
        if (response.ok && result.length > 0) {
            const video = result[0];
            const responseDelete = await fetch(`/admin/deleteVideo/${video.id_multimedia}`, {
                method: "DELETE",
            });
            if (!responseDelete.ok) {
                throw new Error("Error al eliminar el video");
            }
        } else {
            console.log("No hay video para este modulo");
        }
    } catch (error) {
        console.error("Error en la eliminación:", error);
        document.getElementById("message").textContent = `Error al eliminar el video ${id_modulo}`;
    }
}

async function subirPdf(id_modulo) {
    const fileInput = document.getElementById(`pdfInput${id_modulo}`);
    const file = fileInput.files[0];
    if (!file) return alert("Selecciona un archivo");
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("id_modulo", id_modulo);
    try {
        response = await fetch("/admin/uploadpdf", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        console.error("Error en la subida:", error);
    }
}

async function eliminarPdf(id_modulo) {
    try {
        const response = await fetch(`/admin/pdf/${id_modulo}`, {
            method: "GET",
        });
        const result = await response.json();
        if (response.ok && result.length > 0) {
            const pdf = result[0];
            const responseDelete = await fetch(`/admin/deletePdf/${pdf.id_evaluacion}`, {
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