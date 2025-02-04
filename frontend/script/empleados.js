document.getElementById("formularioEmpleado").addEventListener("submit", async function(event) {
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
});