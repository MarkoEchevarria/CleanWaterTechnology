document.addEventListener("DOMContentLoaded", () => {

    async function listarCursos() {
        try {
            const response = await fetch("/admin/listarAllCursos");
            const cursos = await response.json();
            const section_cursos = document.getElementById("section-cursos")
            if (response.ok && cursos.data && cursos.data.length > 0) {

                cursos.data.forEach(curso => {
                    const select = document.createElement("div")
                    select.setAttribute("class", "curso")
                    select.setAttribute("id", `curso-${curso.id_curso}`)
                    const details_curso = document.createElement("details")
                    details_curso.setAttribute("class", "details-curso")
                    details_curso.setAttribute("id", `curso-${curso.id_curso}`)
                    details_curso.innerHTML = `
                    <summary>${curso.nombre}</summary>
                    <div class="module-container"></div>
                    `
                    select.appendChild(details_curso) 

                    async function listarModulos() {
                        const response = await fetch(`/admin/listarModulos/${curso.id_curso}`);
                        const modulos = await response.json();

                        if (response.ok && modulos.data && modulos.data.length > 0) {
                            modulos.data.forEach(modulo => {
                                const moduleElement = document.createElement("div");
                                moduleElement.setAttribute("id",`module-${modulo.id_modulo}`);
                                moduleElement.setAttribute("class", "module");
                                moduleElement.setAttribute("style", "display: flex")
                            
                                moduleElement.innerHTML = `<strong style="display: flex: 1; text-align: center; ">${modulo.titulo}</strong> <p style="display: flex: 1; text-align: center;">${modulo.descripcion}</p> <button class="eliminar-modulo" onclick="eliminarModulo(${modulo.id_modulo})" style="display: flex: 1; text-align: center; background-color: #ff4141; border-radius: 5px">Eliminar</button>`;
                                details_curso.appendChild(moduleElement);
                            });
                            const formulario = document.createElement("form")
                            formulario.setAttribute("id", `modulo-formulario-${curso.id_curso}`)
                            formulario.setAttribute("class", "modulo-formulario oculto")
                            const agregarboton = document.createElement("button")
                            agregarboton.setAttribute("class", "agregar-modulo")
                            agregarboton.setAttribute("onclick", `MostrarOcultar('${curso.id_curso}')`)
                            agregarboton.innerHTML = "+"
                            formulario.innerHTML = `
                                <form id="modulo-formulario-${curso.id_curso}" class="modulo-formulario oculto">
                                    <input type="text" id="titulo-modulo-${curso.id_curso}" class="titulo-modulo" placeholder="Título del módulo">
                                    <input type="text" id="descripcion-modulo-${curso.id_curso}" class="descripcion-modulo" placeholder="Descripción del módulo">
                                    <button class="guardar-modulo" id="guardar-modulo" onclick="event.preventDefault();guardarDatos('${curso.id_curso}')">Guardar Módulo</button>
                                </form>
                            `
                            details_curso.appendChild(agregarboton)
                            details_curso.appendChild(formulario)
                        } else {
                            console.log("Error:", modulos.message);
                        }
                    }
                    listarModulos()

                    section_cursos.appendChild(select);
                });
            } else {
                console.log("Error:", cursos.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    listarCursos()
})

function MostrarOcultar(id_curso) {
    const form = document.getElementById(`modulo-formulario-${id_curso}`);
    form.classList.toggle("oculto");
}  

async function guardarDatos(id_curso) {
    const titulo_modulo = document.getElementById(`titulo-modulo-${id_curso}`).value
    const descripcion_modulo = document.getElementById(`descripcion-modulo-${id_curso}`).value
    console.log(titulo_modulo, descripcion_modulo)

    const data = {
        id_curso: id_curso,
        titulo: titulo_modulo,
        descripcion: descripcion_modulo
    }

    const response = await fetch("/admin/agregarModulo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        console.log("Módulo agregado")
    } else {
        console.log("Error:", response.statusText)
    }
    window.location.reload()
}

async function eliminarModulo(id_modulo) {
    const response = await fetch(`/admin/eliminarModulo/${id_modulo}`, {
        method: "DELETE"
    })
    if (response.ok) {
        console.log("Módulo eliminado")
    }
    window.location.reload()
}