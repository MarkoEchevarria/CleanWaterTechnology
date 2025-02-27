document.addEventListener("DOMContentLoaded", () => {

    actualizarNumModulos();

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

async function actualizarNumModulos() {
    try {
        const response = await fetch("/admin/listarCursos");
        const cursos = await response.json();
        if (response.ok && cursos.data && cursos.data.length > 0) {
            cursos.data.forEach(curso => {
                async function contarModulos() {
                    const response = await fetch(`/admin/contarModulos/${curso.id_curso}`);
                    if (response.ok) {
                        console.log(`${curso.id_curso} actualizado`);
                    }
                }
                contarModulos()
            })
        }
    } catch (error) {
        console.log("Error:", error);
    }
}