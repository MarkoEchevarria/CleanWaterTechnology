function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarModulos() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const id_curso = urlParams.get('id_curso');
            const response = await fetch(`/empleado/showModulos/${id_curso}`);
            const data = await response.json();

            const titulo_modulos = document.getElementById("titulo_modulos");
            const curso_datos = await fetch(`/empleado/verDatosCurso/${id_curso}`);
            const datos_curso = await curso_datos.json();
            titulo_modulos.innerHTML = `Módulos del Curso: ${capitalizeFirstLetter(datos_curso.data[0].nombre)}`;

            const lista_modulos = document.getElementById("lista_modulos");
            const no_modulos = document.getElementById("no_modulos");

            if (response.ok && data.data.length > 0) {
                no_modulos.style.display = "none";

                data.data.forEach(emp => {
                    const cuadroModulo = document.createElement("div");
                    //cuadroModulo.setAttribute("class", "col-4");
                    cuadroModulo.classList.add("p-4", "bg-blue-100", "border-l-4", "border-blue-600", "shadow-md", "rounded-lg", "flex", "items-center", "justify-between");
                    cuadroModulo.innerHTML = `
                        <img src="../imagenes/modulos.png" alt="Módulo 1" class="w-16 h-16 rounded-lg">
                        <div class="flex-1 mx-4">
                            <h2 class="text-xl font-semibold text-blue-700">${capitalizeFirstLetter(emp.titulo)}</h2>
                            <p class="text-gray-600">${capitalizeFirstLetter(emp.descripcion)}</p>
                        </div>
                        <div class="flex gap-2">
                            <a class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onclick="cargarVideo(${emp.id_modulo})">Ver Video</a>

                            <a class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onclick="cargarPdf(${emp.id_modulo})">Evaluacion</a>
                        </div>

                    `;
                    
                    lista_modulos.appendChild(cuadroModulo);
                });
            } else {
                lista_modulos.innerHTML = "";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    cargarModulos();
});

function cargarVideo(id_modulo) {
    async function cargarRutaVideos(id_modulo) {
        console.log(id_modulo)
        const urlParams = new URLSearchParams(window.location.search);
        const dni = urlParams.get('dni')
        const response = await fetch(`/empleado/redirectVideoModulo/${id_modulo}&${dni}`);
        if (response.ok) {
            const result = await response.json();
            console.log("Result es: ", result)
            ruta = result.redirectTo;
            console.log("Redirigiendo a:", ruta);
            window.location.href = result.redirectTo;
            console.log(response);
        }
    }
    cargarRutaVideos(id_modulo);
}

function cargarPdf(id_modulo) {
    async function cargarRutaPdfs(id_modulo) {
        console.log(id_modulo)
        const urlParams = new URLSearchParams(window.location.search);
        const dni = urlParams.get('dni')
        const response = await fetch(`/empleado/redirectPdfModulo/${id_modulo}&${dni}`);
        if (response.ok) {
            const result = await response.json();
            console.log("Result es: ", result)
            ruta = result.redirectTo;
            console.log("Redirigiendo a:", ruta);
            window.location.href = result.redirectTo;
            console.log(response);
        }
    }
    cargarRutaPdfs(id_modulo);
}