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
            console.log(userDNI)
            const response = await fetch(`/empleado/showCursosInscrito/${userDNI}`);
            const data = await response.json();
            const cuadro_cursos = document.getElementById("cuadro_cursos");
            const listaEmpleados = document.getElementById("section_cursos");
            const mensajeEmpleados = document.getElementById("lista-cursos");

            if (response.ok && data.data.length > 0) {
                mensajeEmpleados.style.display = "none";

                data.data.forEach(emp => {
                    const cuadroCurso = document.createElement("div");
                    cuadroCurso.setAttribute("class", "col-4");
                    cuadroCurso.setAttribute("style", `width: 30%; text-align: center; display: flex; border-radius: 10%;flex-direction:column ;justify-content: center; align-items: stretch;" onmouseover="this.style.transform='translateY(-10px)'; background-color: #f1f1f1`);
                    cuadroCurso.setAttribute("onmouseover", "this.style.transform='translateY(-10px)';");
                    cuadroCurso.setAttribute("onmouseout", "this.style.transform='translateY(0)';");
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