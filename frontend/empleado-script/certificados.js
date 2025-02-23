function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

function formatearFecha(fechaISO) {
    if (fechaISO === null) {
        return '---'
    } else {
        const [year, month, day] = new Date(fechaISO).toISOString().split("T")[0].split("-");
        return `${day}-${month}-${year}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    async function cargarCursos() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const userDNI = urlParams.get('dni');
            const response = await fetch(`/empleado/showCertificados/${userDNI}`);
            const data = await response.json();
            const cuadro_certificados = document.getElementById("certificados");
            const mensaje_no_cursos = document.getElementById("mensaje-no-cursos");

            const RegresarButton = document.getElementById("RegresarButton");
            RegresarButton.setAttribute("onclick", `volverInicio(${userDNI})`);

            if (response.ok && data.data.length > 0) {
                mensaje_no_cursos.style.display = "none";

                data.data.forEach(emp => {
                    const cuadroCurso = document.createElement("div");
                    cuadroCurso.setAttribute("class", "curso");
                    cuadroCurso.classList.add("bg-gradient-to-r", "from-teal-100", "to-teal-50", "shadow-md", "rounded-lg", "p-5", "flex", "items-center", "gap-6", "border-l-8", "border-teal-500");
                    cuadroCurso.innerHTML = `

                         <img src="../imagenes/curso.png" alt="Certificado" class="w-32 h-32 object-cover rounded-lg shadow-md">
                        <div class="flex-1" style="font-size: 1.5rem;">
                            <p class="text-gray-700 font-medium">Fecha de emisión: <span class="text-teal-700 font-semibold">${formatearFecha(emp.fecha_emision)}</span></p>
                            <h3 class="text-2xl font-bold text-teal-800 mt-1">${capitalizeFirstLetter(emp.nombre_curso)}</h3>
                            <div class="mt-2 flex gap-3">
                                <a href="#" target="_blank" class="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700">Ver</a>
                                <a href="#" download class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">Descargar</a>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md w-1/2" >
                            <p class="text-gray-700 text-2xl" > Se deja constancia que <b>${capitalizeFirstLetter(emp.nombre)} ${capitalizeFirstLetter(emp.apellido)} </b> identificado con dni <b>${emp.dni}</b> ha culminado con exito los <b>${emp.num_modulos}</b> modulos del curso de <b>${capitalizeFirstLetter(emp.nombre_curso)}</b> </p>
                        </div>
                    `;
                    cuadro_certificados.appendChild(cuadroCurso);
                });
            } else {
                cuadro_certificados.innerHTML = "";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    cargarCursos();
});

async function volverInicio(dni) {
    const volver = await fetch(`/empleado/volverInicio/${dni}`);
    if (volver.ok) {
        const result = await volver.json();
        if (result.redirectTo){
            window.location.href = result.redirectTo;
        } else {
            console.log("No se recibió una URL de redirección");
        }
    }
}