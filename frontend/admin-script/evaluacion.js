function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarCursosModulosEvaluaciones() {
        try {
            const response = await fetch("/admin/showCursos");
            const data_cursos = await response.json();
            const main_evaluacion = document.getElementById("main-evaluacion");
            const noEvaluacionesMensaje = document.getElementById("noEvaluacionesMensaje");

            if (response.ok && data_cursos.data && data_cursos.data.length > 0) {
                noEvaluacionesMensaje.style.display = "none";
                main_evaluacion.style.display = "block";

                data_cursos.data.forEach(curso => {
                    const curso_head = document.createElement("details");
                    curso_head.setAttribute("class", `subcontenedor`);
                    curso_head.classList.add( "bg-white", "shadow-md", "rounded-lg","p-5", "border-l-8","border-teal-500" )
                    curso_head.setAttribute("id", "lista-evaluaciones");
                    curso_head.innerHTML = `
                        <summary class="text-2xl font-bold text-teal-800 cursor-pointer">
                            ${capitalizeFirstLetter(curso.nombre)}
                        </summary>
                    `;

                    async function cargarEvaluaciones() {
                        const response_modulo = await fetch(`/admin/showModulos/${curso.id_curso}`);
                        const modulos = await response_modulo.json();
                        const div_curso_head = document.createElement("div")
                        div_curso_head.classList.add("mt-3", "space-y-3")
                        if (modulos.data.length > 0) {
                            modulos.data.forEach(modulo => {
                                const moduloDiv = document.createElement("div");
                                moduloDiv.setAttribute("class", "mt-3");
                                moduloDiv.classList.add("p-3", "bg-gray-100", "rounded-md", "shadow-sm", "flex", "justify-between", "items-center")
                                moduloDiv.innerHTML = `
                                    <span class="text-gray-700 font-medium"> ${modulo.titulo} </span>
                                    <button class="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700" onclick="enviarPaginaEvaluaciond(${modulo.id_modulo})">Subir Evaluación</button>
                                `;
                                div_curso_head.appendChild(moduloDiv);
                            });
                            curso_head.appendChild(div_curso_head)
                        } else {console.log('No hay modulos disponibles')}
                    }

                    cargarEvaluaciones();

                    main_evaluacion.appendChild(curso_head);
                });
            } else {
                listaEvaluaciones.innerHTML = "";
                main_evaluacion.style.display = "none";
                noEvaluacionesMensaje.style.display = "block";
                noEvaluacionesMensaje.textContent = "No hay módulos disponibles.";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            noEvaluacionesMensaje.style.display = "block";
            noEvaluacionesMensaje.textContent = "Hubo un error al cargar los módulos.";
        }
    }

    cargarCursosModulosEvaluaciones();
});

function enviarPaginaEvaluacion(id_modulo) {
    async function enviarRutaEvaluacion(id_modulo) {
        const response = await fetch(`/admin/redirectCrearEvaluacion/${id_modulo}`);
        if (response.ok) {
            const result = await response.json();
            console.log("Result es: ", result)
            ruta = result.redirectTo;
            console.log("Redirigiendo a:", ruta);
            window.location.href = result.redirectTo;
        }
    }
    enviarRutaEvaluacion(id_modulo);
}
