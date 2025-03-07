function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarCursos() {
        try {
            const response = await fetch("/admin/showCursos");
            const data = await response.json();
            const tabla = document.getElementById("tabla-cursos");
            const listaEmpleados = document.getElementById("listaCursos");
            const mensajeEmpleados = document.getElementById("lista-cursos");

            if (response.ok && data.data.length > 0) {
                listaEmpleados.innerHTML = "";
                mensajeEmpleados.style.display = "none";
                tabla.style.display = "table";

                function formatearFecha(fechaISO) {
                    if (fechaISO === null) {
                        return '---'
                    } else {
                        const [year, month, day] = new Date(fechaISO).toISOString().split("T")[0].split("-");
                        return `${day}-${month}-${year}`;
                    }
                }

                data.data.forEach(emp => {// emp.num_modulos
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${capitalizeFirstLetter(emp.nombre)}</td>
                        <td>${capitalizeFirstLetter(emp.descripcion)}</td>
                        <td>${ emp.num_modulos }</td> 
                        <td>${formatearFecha(emp.fecha_creacion)}</td>
                        <td>${emp.codigo}</td>
                        <td>
                            <button class="btn btn-primary modify-btn" onclick="recuperarCurso('${emp.id_curso}')" style="padding: 20px auto; border-collapse: collapse; font-size: 18px; background-color:rgba(255, 234, 2, 0.87)"><i class="fa-solid fa-user-pen"></i></button>

                            <button class="btn btn-danger delete-btn" onclick="eliminarCurso('${emp.id_curso}')" style="padding: 20px auto; border-collapse: collapse; font-size: 18px; background-color: #ff4141"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    `;
                    
                    listaCursos.appendChild(fila);
                });
            } else {
                listaCursos.innerHTML = "";
                tabla.style.display = "none";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    cargarCursos();
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

        /**
        if (data.num_modulos) {
            data.num_modulos = parseInt(data.num_modulos, 10);
        } **/

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
    const nombre = document.getElementById("edit-nombres").value;
    // const num_modulos = document.getElementById("edit-num_modulos").value;
    const descripcion = document.getElementById("edit-descripcion").value;

    async function updateCurso() {
        try {
            const response = await fetch(`/admin/updateCurso/${id_curso}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, descripcion }) //  num_modulos, 
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
    // const num_modulos = document.getElementById('edit-num_modulos').value.trim();
    const descripcion = document.getElementById('edit-descripcion').value.trim();

    const botonGuardar = document.getElementById('guardar-cambios');

    if (nombre && descripcion) { // num_modulos &&
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