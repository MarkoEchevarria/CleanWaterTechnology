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

                    const response_modulo = await fetch(`/admin/showModulos/${curso.id_curso}`);
                    const modulos = await response_modulo.json();
                    console.log(modulos.data)
                    if (modulos.data.length > 0) {
                        modulos.data.forEach( async (modulo) => {
                            const moduloDiv = document.createElement("div");
                            moduloDiv.setAttribute("class", "modulo");
                            moduloDiv.innerHTML = `
                                <h4 class="titulo-modulo"> ${modulo.titulo} </h4>
                                <div class="descripcion-modulo"> ${modulo.descripcion} </div>
                                <div class="contador"> Num Inscritos: 0 </div>
                            `

                            const response_video = await fetch(`/admin/video/${modulo.id_modulo}`);
                            const data_video = await response_video.json();

                            const videoDiv = document.createElement("form");
                            videoDiv.setAttribute("id", "uploadForm");
                            console.log("este es el data_video",data_video)

                            // console.log(data)
                            if (data_video.length > 0) {
                                videoDiv.innerHTML = `
                                    <!-- <div> Ya existe material para este modulo.</div> -->
                                    <button type="button" onclick="eliminarVideo(${modulo.id_modulo})" >Eliminar Material Existente</button>
                                    `;
                                    moduloDiv.appendChild(videoDiv);
                            } else {
                                videoDiv.innerHTML = `
                                    <input type="file" id="videoInput${modulo.id_modulo}" accept="video/*" required>
                                    <button type="button" onclick="subirVideo(${modulo.id_modulo})" >Subir</button>
                                    `;
                                    
                            }
                            moduloDiv.appendChild(videoDiv);
                            curso_head.appendChild(moduloDiv);                           
                        });
                    } else {console.log("pues algo salio mal pipipi, mira a continuacion",modulos.data)}

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

async function subirVideo(id_modulo) {
    const fileInput = document.getElementById(`videoInput${id_modulo}`);
    const file = fileInput.files[0];

    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("id_modulo", id_modulo);

    try {
        const response = await fetch("http://localhost:3000/admin/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("message").textContent = `Video ${id_modulo} subido correctamente`;
        } else {
            document.getElementById("message").textContent = `Error en el video ${id_modulo}: ` + result.message;
        }
    } catch (error) {
        console.error("Error en la subida:", error);
        document.getElementById("message").textContent = `Error al subir el video ${id_modulo}`;
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
            const responseDelete = await fetch(`http://localhost:3000/admin/deleteVideo/${video.id_multimedia}`, {
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