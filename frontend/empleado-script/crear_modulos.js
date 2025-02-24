document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".agregar-modulo").forEach(button => {
        button.addEventListener("click", (event) => {
            const form = event.target.nextElementSibling;
            form.classList.toggle("oculto"); // Alterna la visibilidad
        });
    });    

    document.querySelectorAll(".guardar-modulo").forEach(button => {
        button.addEventListener("click", (event) => {
            const form = event.target.closest(".modulo-formulario");
            const moduleContainer = form.closest("details").querySelector(".module-container");
            const titleInput = form.querySelector(".titulo-modulo");
            const descriptionInput = form.querySelector(".descripcion-modulo");

            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            if (title !== "" && description !== "") {
                const moduleElement = document.createElement("div");
                moduleElement.classList.add("module");
                moduleElement.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
                moduleContainer.appendChild(moduleElement);
                titleInput.value = "";
                descriptionInput.value = "";
                form.classList.add("oculto");
            }
        });
    });
});
