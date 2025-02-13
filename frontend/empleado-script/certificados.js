function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarCursos() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const userDNI = urlParams.get('dni') || "11112222";
            const response = await fetch(`/empleado/showCertificados/${userDNI}`);
            const data = await response.json();
            const cuadro_certificados = document.getElementById("certificados");
            // const listaEmpleados = document.getElementById("section_cursos");
            const mensaje_no_cursos = document.getElementById("mensaje-no-cursos");

            if (response.ok && data.data.length > 0) {
                mensaje_no_cursos.style.display = "none";

                data.data.forEach(emp => {
                    const cuadroCurso = document.createElement("div");
                    cuadroCurso.setAttribute("class", "curso");
                    //cuadroCurso.setAttribute("style", "background-color: #caf9f0; border: 1px solid #ddd; border-radius: 1rem; padding: 2rem; box-shadow: 0px 5px 15px rgba(112, 112, 112, 0.48);");
                    cuadroCurso.classList.add("bg-gradient-to-r", "from-teal-100", "to-teal-50", "shadow-md", "rounded-lg", "p-5", "flex", "items-center", "gap-6", "border-l-8", "border-teal-500");
                    cuadroCurso.innerHTML = `

                         <img src="../imagenes/curso.png" alt="Certificado" class="w-32 h-32 object-cover rounded-lg shadow-md">
                        <div class="flex-1">
                            <p class="text-gray-700 font-medium">Fecha de emisión: <span class="text-teal-700 font-semibold">${emp.fecha_emision}</span></p>
                            <h3 class="text-xl font-bold text-teal-800 mt-1">${capitalizeFirstLetter('Titulo del curso al que pertenece el certificado')}</h3>
                            <div class="mt-2 flex gap-3">
                                <a href="#" target="_blank" class="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700">Ver</a>
                                <a href="#" download class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">Descargar</a>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md w-1/2">
                            <p class="text-gray-700 text-sm">${emp.descripcion}</p>
                        </div>
                    `;
                    cuadro_certificados.appendChild(cuadroCurso);
                });
            } else {
                cuadro_certificados.innerHTML = "";
                // tabla.style.display = "none";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    cargarCursos();
});