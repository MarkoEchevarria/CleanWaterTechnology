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
            const userDNI = urlParams.get('dni');
            const response = await fetch(`/empleado/showCursosInscrito/${userDNI}`);
            const data = await response.json();
            const cuadro_cursos = document.getElementById("cuadro_cursos");
            const listaEmpleados = document.getElementById("section_cursos");
            const mensajeEmpleados = document.getElementById("lista-cursos");

            const RegresarButton = document.getElementById("RegresarButton");
            RegresarButton.setAttribute("onclick", `volverInicio(${userDNI})`);

            if (response.ok && data.data.length > 0) {
                mensajeEmpleados.style.display = "none";

                data.data.forEach(emp => {
                    console.log(`El codigo para el curso ${emp.nombre} es ${emp.id_curso}`)
                    const cuadroCurso = document.createElement("div");
                    cuadroCurso.setAttribute("class", "col-4");
                    cuadroCurso.setAttribute("style", `width: 30%; text-align: center; display: flex; border-radius: 10%;flex-direction:column ;justify-content: center; align-items: stretch;" onmouseover="this.style.transform='translateY(-10px)'; background-color: #f1f1f1`);
                    cuadroCurso.setAttribute("onmouseover", "this.style.transform='translateY(-10px)';");
                    cuadroCurso.setAttribute("onmouseout", "this.style.transform='translateY(0)';");
                    cuadroCurso.setAttribute("onclick", `cargarModulos("${emp.id_curso}");`);
                    cuadroCurso.innerHTML = `

                        <img src="../imagenes/curso.png" alt="" style="width: 70%; border-radius: 10px; margin: 0 auto; align-items: stretch;">
                        <h2 style=" font-size: 1.5em;">${capitalizeFirstLetter(emp.nombre)}</h2>
                        <h2 style=" padding: 1em 0;">${capitalizeFirstLetter(emp.descripcion)}</h2>
                        <h2 style=" padding: .5em 0;">Numero de Modulos: ${emp.num_modulos}</h2>
                    `;
                    
                    cuadro_cursos.appendChild(cuadroCurso);
                });
            } else {
                cuadro_cursos.innerHTML = "";
                // tabla.style.display = "none";
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    cargarCursos();
});

function cargarModulos(id_curso) {
    async function cargarRutaModulos(id_curso) {
        console.log(id_curso)
        const urlParams = new URLSearchParams(window.location.search);
        const dni = urlParams.get('dni');

        const response = await fetch(`/empleado/redirectModulosCurso/${id_curso}&${dni}`);
        if (response.ok) {
            const result = await response.json();
            console.log("Result es: ", result)
            ruta = result.redirectTo;
            console.log("Redirigiendo a:", ruta);
            window.location.href = result.redirectTo;
            console.log(response);
        }
    }
    cargarRutaModulos(id_curso);
}

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