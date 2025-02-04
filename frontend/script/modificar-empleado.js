document.addEventListener("DOMContentLoaded", function() {
    async function cargarEmpleados() {
        try {
            const response = await fetch("/showEmployee");
            const data = await response.json();
            const tabla = document.getElementById("tabla-empleados");
            const listaEmpleados = document.getElementById("listaEmpleados");
            const mensajeEmpleados = document.getElementById("lista-empleados");

            function capitalizeFirstLetter(word) {
                const firstLetter = word.charAt(0)
                const firstLetterCap = firstLetter.toUpperCase()
                const remainingLetters = word.slice(1)
                const capitalizedWord = firstLetterCap + remainingLetters
                return capitalizedWord
            }

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
                    `;  //<td>${emp.id_empleado}</td>
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
