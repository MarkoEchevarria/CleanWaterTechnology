// Variable global para el índice del empleado editado
let empleadoEditandoIndex = null;

// Función para agregar un nuevo empleado
function agregarEmpleado() {
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let dni = document.getElementById("dni").value;
    let correo = document.getElementById("correo").value;
    let rol = document.getElementById("rol").value;

    // Verificar que todos los campos estén completos
    if (nombres && apellidos && dni && correo && rol) {
        let nuevoEmpleado = { nombres, apellidos, dni, correo, rol };
        let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
        empleados.push(nuevoEmpleado);
        localStorage.setItem("empleados", JSON.stringify(empleados));

        // Limpiar los campos después de agregar
        document.getElementById("nombres").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("rol").value = "";

        // Mostrar mensaje de éxito
        alert("Empleado registrado con éxito.");
        mostrarEmpleados(); // Refrescar la lista de empleados
    } else {
        alert("No se puede dejar ningún campo vacío.");
    }
}

// Función para mostrar los empleados registrados
function mostrarEmpleados() {
    const listaEmpleados = document.getElementById("lista-empleados");
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    listaEmpleados.innerHTML = "";

    if (empleados.length === 0) {
        listaEmpleados.innerHTML = "<p>No hay empleados registrados</p>";
    } else {
        const ul = document.createElement("ul");
        ul.classList.add("sombra");
        empleados.forEach((empleado, index) => {
            const li = document.createElement("li");
            li.classList.add("sombra", "campo");

            // Crear un contenedor para los datos
            const contenedorDatos = document.createElement("div");
            contenedorDatos.classList.add("contenedor-datos");

            // Crear los divs para cada dato con el formato deseado
            const nombre = document.createElement("div");
            nombre.innerHTML = `<strong>Empleado:</strong> ${empleado.nombres} ${empleado.apellidos}`;
            contenedorDatos.appendChild(nombre);

            const dni = document.createElement("div");
            dni.innerHTML = `<strong>DNI:</strong> ${empleado.dni}`;
            contenedorDatos.appendChild(dni);

            const correo = document.createElement("div");
            correo.innerHTML = `<strong>Correo:</strong> ${empleado.correo}`;
            contenedorDatos.appendChild(correo);

            const rol = document.createElement("div");
            rol.innerHTML = `<strong>Rol:</strong> ${empleado.rol}`;
            contenedorDatos.appendChild(rol);


            // Crear el botón de modificar
            const btnModificar = document.createElement("button");
            btnModificar.textContent = "Modificar";
            btnModificar.classList.add("boton");
            btnModificar.onclick = () => editarEmpleado(index);

            // Agregar el contenedor de datos y el botón
            li.appendChild(contenedorDatos);
            li.appendChild(btnModificar);
            ul.appendChild(li);
        });
        listaEmpleados.appendChild(ul);
    }
}


// Función para eliminar un empleado
function eliminarEmpleado(index) {
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    if (confirm("¿Estás seguro de que deseas eliminar a este empleado?")) {
        empleados.splice(index, 1); // Eliminar el empleado del array
        localStorage.setItem("empleados", JSON.stringify(empleados)); // Actualizar el localStorage
        mostrarEmpleados(); // Refrescar la lista de empleados
    }
}
// Función para editar un empleado
function editarEmpleado(index) {
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    const empleado = empleados[index];

    // Guardar el índice del empleado que se está editando
    empleadoEditandoIndex = index;

    // Rellenar los campos del formulario con la información del empleado
    document.getElementById("edit-nombres").value = empleado.nombres;
    document.getElementById("edit-apellidos").value = empleado.apellidos;
    document.getElementById("edit-dni").value = empleado.dni;
    document.getElementById("edit-correo").value = empleado.correo;
    document.getElementById("edit-rol").value = empleado.rol;

    document.getElementById("formulario-edicion").style.display = "block";
}

// Función para guardar los cambios del empleado
document.getElementById("guardar-cambios").addEventListener("click", function (e) {
    e.preventDefault();
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    // Verificar que se haya seleccionado un empleado para editar
    if (empleadoEditandoIndex !== null) {
        empleados[empleadoEditandoIndex].nombres = document.getElementById("edit-nombres").value;
        empleados[empleadoEditandoIndex].apellidos = document.getElementById("edit-apellidos").value;
        empleados[empleadoEditandoIndex].dni = document.getElementById("edit-dni").value;
        empleados[empleadoEditandoIndex].correo = document.getElementById("edit-correo").value;
        empleados[empleadoEditandoIndex].rol = document.getElementById("edit-rol").value;

        // Guardar los cambios en el localStorage
        localStorage.setItem("empleados", JSON.stringify(empleados));

        // Cerrar el formulario de edición y actualizar la lista
        document.getElementById("formulario-edicion").style.display = "none";
        alert("Empleado modificado con exito");
        mostrarEmpleados();
    }
});

// Cuando el DOM esté cargado, mostrar los empleados
document.addEventListener("DOMContentLoaded", function () {
    mostrarEmpleados();
});
