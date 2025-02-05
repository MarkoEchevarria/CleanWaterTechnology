function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarEmpleados() {
        try {
            const response = await fetch("/showEmployee");
            const data = await response.json();
            const tabla = document.getElementById("tabla-empleados");
            const listaEmpleados = document.getElementById("listaEmpleados");
            const mensajeEmpleados = document.getElementById("lista-empleados");

            if (response.ok && data.data.length > 0) {
                listaEmpleados.innerHTML = "";
                mensajeEmpleados.style.display = "none";  // Oculta el mensaje
                tabla.style.display = "table";  // Muestra la tabla

                data.data.forEach(emp => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${capitalizeFirstLetter(emp.nombre)}</td>
                        <td>${capitalizeFirstLetter(emp.apellido)}</td>
                        <td>${emp.dni}</td>
                        <td>${emp.correo}</td>
                        <td>${capitalizeFirstLetter(emp.rol)}</td>
                        <td>
                            <button class="btn btn-primary modify-btn" onclick="recuperarEmpleado('${emp.id_empleado}')" style="padding: 20px auto; border-collapse: collapse; font-size: 18px; background-color:rgba(255, 234, 2, 0.87)"><i class="fa-solid fa-user-pen"></i></button>

                            <button class="btn btn-danger delete-btn" onclick="eliminarEmpleado('${emp.id_empleado}')" style="padding: 20px auto; border-collapse: collapse; font-size: 18px; background-color: #ff4141"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    `;
                    
                    listaEmpleados.appendChild(fila);
                });
            } else {
                listaEmpleados.innerHTML = "";
                tabla.style.display = "none";
                mensajeEmpleados.style.display = "block";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            document.getElementById("mensaje-empleados").innerHTML = "<p>Error al cargar los empleados</p>";
        }
    }

    cargarEmpleados();
});

function mostrarFormularioRegistrar() {
    document.getElementById("formulario-registrar-edicion").style.display = "block"
    document.getElementById("section-lista-empleados").style.display = "none"
} 

function registrarEmpleado() {
    document.getElementById("formularioRegistrarEmpleado").addEventListener("submit", agregarEmpleado)

    async function agregarEmpleado(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(data))
    
        const response = await fetch("/registerEmployee", {
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

function eliminarEmpleado(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
        return;
    }

    fetch(`/deleteEmployee/${id}`, {
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
        alert("Empleado eliminado correctamente");
        location.reload();
    })
    .catch(error => {
        console.error("Error al eliminar empleado:", error);
        alert("No se pudo eliminar el empleado: " + error.message);
    });
}

function recuperarEmpleado(id_empleado) {
    document.getElementById("formulario-edicion").style.display = "block";
    document.getElementById("section-lista-empleados").style.display = "none";
    async function cargarEmpleados() {
        try {
            const response = await fetch(`/showOneEmployee/${id_empleado}`);
            const data = await response.json();
            empleado  = data.data[0];
            document.getElementById("titulo-formulario-edicion").innerHTML=`<h2>Actualizar datos : ${capitalizeFirstLetter(empleado.nombre)} ${capitalizeFirstLetter(empleado.apellido)}</h2>`;

            document.getElementById("edit-nombres").value = capitalizeFirstLetter(empleado.nombre);
            document.getElementById("edit-apellidos").value = capitalizeFirstLetter(empleado.apellido);
            document.getElementById("edit-dni").value = empleado.dni;
            document.getElementById("edit-correo").value = empleado.correo;
            document.getElementById("edit-rol").value = capitalizeFirstLetter(empleado.rol);

            const inputs = document.querySelectorAll('.input-text');
            inputs.forEach(input => {
                input.addEventListener('input', () => habilitarBoton(empleado.id_empleado));
            });

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    cargarEmpleados()
}

function habilitarBoton(id_empleado) {
    const nombre = document.getElementById('edit-nombres').value.trim();
    const apellido = document.getElementById('edit-apellidos').value.trim();
    const dni = document.getElementById('edit-dni').value.trim();
    const correo = document.getElementById('edit-correo').value.trim();
    const rol = document.getElementById('edit-rol').value.trim();

    const botonGuardar = document.getElementById('guardar-cambios');

    if (nombre && apellido && dni && correo && rol) {
        botonGuardar.disabled = false;
        botonGuardar.style.color = '#fff';
        botonGuardar.style.backgroundColor = '#4CAF50'
        botonGuardar.onclick = () => modificarEmpleado(id_empleado);
    } else {
        botonGuardar.disabled = true;
        botonGuardar.style.color = '#a9aaaa';
        botonGuardar.style.backgroundColor = '#d6d7d7';
    }
}

function modificarEmpleado(id_empleado) {
    console.log(id_empleado)

    const nombre = document.getElementById("edit-nombres").value;
    const apellido = document.getElementById("edit-apellidos").value;
    const dni = document.getElementById("edit-dni").value;
    const correo = document.getElementById("edit-correo").value;
    const rol = document.getElementById("edit-rol").value;

    async function updateEmployee() {
        try {
            const response = await fetch(`/updateEmployee/${id_empleado}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, apellido, dni, correo, rol })
            })
            if (response.ok) {
                location.reload();
            } else {
                console.error("Error al modificar empleado");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    updateEmployee();
}