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
    } else {
        alert("Hubo un error al enviar los datos.");
    }
};
document.getElementById("formularioEmpleado").addEventListener("submit", agregarEmpleado);

/*
async function cargarEmpleados() {
    try {
        const response = await fetch("/showEmployee"); 
        const data = await response.json();

        if (response.ok) {
            console.log("datos logrados")
            const empleados = data.data;
            const tabla = document.getElementById("listaEmpleados");
            tabla.innerHTML = "";

            empleados.forEach(emp => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${emp.id_empleado}</td>
                    <td>${emp.nombre}</td>
                    <td>${emp.apellido}</td>
                    <td>${emp.dni}</td>
                    <td>${emp.correo}</td>
                    <td>${emp.rol}</td>
                `;
                tabla.appendChild(fila);
            });
        } else {
            console.error("Error al obtener empleados:", data.message);
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarEmpleados);
*/

document.addEventListener("DOMContentLoaded", function() {
    async function cargarEmpleados() {
        try {
            const response = await fetch("/showEmployee");
            const data = await response.json();
            /*
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
            
            const data = await response.json();
            */
            if (response.ok) {
                console.log("datos logrados")
                const empleados = data.data;
                const tabla = document.getElementById("listaEmpleados");
                tabla.innerHTML = "";

                empleados.forEach(emp => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${emp.id_empleado}</td>
                        <td>${emp.nombre}</td>
                        <td>${emp.apellido}</td>
                        <td>${emp.dni}</td>
                        <td>${emp.correo}</td>
                        <td>${emp.rol}</td>
                    `;
                    tabla.appendChild(fila);
                });
            } else {
                const data = await response.json();
                console.error("Error al obtener empleados:", data.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    cargarEmpleados();
});