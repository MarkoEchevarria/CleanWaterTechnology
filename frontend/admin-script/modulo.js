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
            const tabla = document.getElementById("tabla-modulos");
            const listaModulos = document.getElementById("listaModulos");
            const mensajeModulos = document.getElementById("lista-modulos");

            if (response.ok && data_cursos.data && data_cursos.data.length > 0) {
                listaModulos.innerHTML = "";
                mensajeModulos.style.display = "none";
                tabla.style.display = "block";

                data_cursos.data.forEach(curso => {
                    const curso_head = document.createElement("div");
                    curso_head.setAttribute("class", `curso-${curso.nombre}`);
                    curso_head.setAttribute("style", `color: red`);
                    curso_head.innerHTML = `
                        <div style="font-size: 5em">${curso.nombre}</div>
                        <div>${curso.descripcion}</div>
                    `;

                    async function cargarModulos() {
                        const response_modulo = await fetch(`/admin/showModulos/${curso.id_curso}`);
                        const modulos = await response_modulo.json();
                        console.log(modulos.data)
                        if (modulos.data.length > 0) {
                            modulos.data.forEach(modulo => {
                                const moduloDiv = document.createElement("div");
                                moduloDiv.setAttribute("class", `contenedor-modulo`);
                                moduloDiv.setAttribute("style", "display: inline");
                                moduloDiv.innerHTML = `
                                    <table>
                                        <div>${modulo.titulo}</div>
                                        <th> ${modulo.descripcion}</th>
                                        <th> Numero de iscritos: 0</th>
                                        <th> <button>Subir Material</button> </th>
                                    </table>
                                `;
                                curso_head.appendChild(moduloDiv);
                            });
                        } else {console.log('pues algo salio mal, pipipi')}
                    }

                    cargarModulos();

                    listaModulos.appendChild(curso_head);
                });
            } else {
                listaModulos.innerHTML = "";
                tabla.style.display = "none";
                mensajeModulos.style.display = "block";
                mensajeModulos.textContent = "No hay módulos disponibles.";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            mensajeModulos.style.display = "block";
            mensajeModulos.textContent = "Hubo un error al cargar los módulos.";
        }
    }

    cargarCursosModulos();
});



function mostrarFormularioRegistrar() {
    document.getElementById("formulario-registrar-edicion").style.display = "block"
    document.getElementById("section-lista-cursos").style.display = "none"
} 

function registrarCurso() {
    document.getElementById("formularioRegistrarCurso").addEventListener("submit", agregarCurso)

    async function agregarCurso(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        if (data.num_modulos) {
            data.num_modulos = parseInt(data.num_modulos, 10);
        }

        console.log(JSON.stringify(data))
    
        const response = await fetch("/admin/registerCurso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            alert("Datos enviados correctamente.");
            location.reload();
        } else {
            alert("Hubo un error al enviar los datos.");
        }
    }
}

function recuperarCurso(id_curso) {
    document.getElementById("formulario-edicion").style.display = "block";
    document.getElementById("section-lista-cursos").style.display = "none";
    async function cargarCursos() {
        try {
            const response = await fetch(`/admin/showOneCurso/${id_curso}`);
            const data = await response.json();
            curso  = data.data[0];
            document.getElementById("titulo-formulario-edicion").innerHTML=`<h2>Actualizar datos : ${capitalizeFirstLetter(curso.nombre)}</h2>`;

            document.getElementById("edit-nombres").value = capitalizeFirstLetter(curso.nombre);
            document.getElementById("edit-num_modulos").value = curso.num_modulos;
            document.getElementById("edit-descripcion").value = curso.descripcion;

            const inputs = document.querySelectorAll('.input-text');
            inputs.forEach(input => {
                input.addEventListener('input', () => habilitarBoton(curso.id_curso));
            });

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    cargarCursos()
}

function modificarCurso(id_curso) {
    console.log(id_curso)

    const nombre = document.getElementById("edit-nombres").value;
    const num_modulos = document.getElementById("edit-num_modulos").value;
    const descripcion = document.getElementById("edit-descripcion").value;

    async function updateCurso() {
        try {
            const response = await fetch(`/admin/updateCurso/${id_curso}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, num_modulos, descripcion })
            })
            if (response.ok) {
                location.reload();
            } else {
                console.error("Error al modificar curso");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    updateCurso();
}


function habilitarBoton(id_curso) {
    const nombre = document.getElementById('edit-nombres').value.trim();
    const num_modulos = document.getElementById('edit-num_modulos').value.trim();
    const descripcion = document.getElementById('edit-descripcion').value.trim();

    const botonGuardar = document.getElementById('guardar-cambios');

    if (nombre && num_modulos && descripcion) {
        botonGuardar.disabled = false;
        botonGuardar.style.color = '#fff';
        botonGuardar.style.backgroundColor = '#4CAF50'
        botonGuardar.onclick = () => modificarCurso(id_curso);
    } else {
        botonGuardar.disabled = true;
        botonGuardar.style.color = '#a9aaaa';
        botonGuardar.style.backgroundColor = '#d6d7d7';
    }
}

function eliminarCurso(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este curso?")) {
        return;
    }

    fetch(`/admin/deleteCurso/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || "Error desconocido"); });
        }
        return response.json();
    })
    .then(data => {
        alert("Curso eliminado correctamente");
        location.reload();
    })
    .catch(error => {
        console.error("Error al eliminar curso:", error);
        alert("No se pudo eliminar el curso: " + error.message);
    });
}