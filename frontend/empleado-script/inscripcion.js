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
            const response = await fetch(`/empleado/showCursos/${userDNI}`);
            const data = await response.json();
            const cuadro_cursos = document.getElementById("cursos");
            // const listaEmpleados = document.getElementById("section_cursos");
            const mensaje_no_cursos = document.getElementById("mensaje-no-cursos");

            if (response.ok && data.data.length > 0) {
                mensaje_no_cursos.style.display = "none";

                data.data.forEach(emp => {
                    console.log(emp.id_curso)
                    const cuadroCurso = document.createElement("div");
                    cuadroCurso.setAttribute("class", "curso");
                    cuadroCurso.setAttribute("style", "background-color: #caf9f0; border: 1px solid #ddd; border-radius: 1rem; padding: 2rem; box-shadow: 0px 5px 15px rgba(112, 112, 112, 0.48);");
                    cuadroCurso.innerHTML = `

                        <h3 class="curso-nombre" style= "font-size: 2.4rem; font-weight: bold; margin-bottom: 1rem;"
                        >${capitalizeFirstLetter(emp.nombre)}</h3>
                        <p class="curso-descripcion" style="font-size: 1.8rem; margin-bottom: 1rem;">
                            ${capitalizeFirstLetter(emp.descripcion)}
                        </p>
                        <p class="curso-modulos" style="font-size: 1.6rem; margin-bottom: 1.5rem;">Módulos: ${emp.num_modulos}</p>
                        <div class="inscripcion" style="display: flex; flex-direction: column; gap: 1rem;">
                            <label for="codigo-js-${emp.id_curso}" style="font-size: 1.6rem; font-weight: bold;">Código de inscripción:</label>
                            <input type="text" id="codigo-js-${emp.id_curso}" class="codigo-inscripcion" style="padding: 1rem; font-size: 1.6rem; border: 1px solid #ccc; border-radius: 0.5rem;" placeholder="Ingresa el código de inscripción del curso">
                            <button class="btn-unirse" style= "background-color: #0097A7; color: #ffffff; border: none; padding: 1rem; font-size: 1.8rem; border-radius: 0.5rem; cursor: pointer; transition: background-color 0.5s;"
                            onmouseover="this.style.backgroundColor = '#FFC107';"
                            onmouseout="this.style.backgroundColor = '#0097A7';"
                            onclick="registrarCurso('${emp.id_curso}')"
                            >Unirse</button>
                        </div>
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

function registrarCurso(id_curso) {
    try {
        async function verificarCodigo() {
            const codigo = document.getElementById(`codigo-js-${id_curso}`).value;
            const data = { codigo, id_curso };
            const urlParams = new URLSearchParams(window.location.search);
            const dni = urlParams.get('dni');
            console.log(data.codigo, data.id_curso, dni)
            const result = await fetch(`/empleado/verificarCodigo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const resutVerificar = await result.json(); 
            console.log(resutVerificar)
            if (result.ok && resutVerificar.data && resutVerificar.data.length > 0) {
                async function registrarCursos() {
                    const incripcion = await fetch(`/empleado/registrarCurso/${dni}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id_curso }),
                    })
                    if (incripcion.ok) {
                        alert("Curso registrado con éxito");
                        //window.location.href = `/empleado/inscripcion?dni=${dni}`;
                    } else {
                        alert("Error al registrar el curso");
                    }
                }
                registrarCursos()
            } else {
                alert("Algo no salio bien");
            }
        }
        verificarCodigo();
        async function recargar() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const dni = urlParams.get('dni');
                const value = await fetch(`/empleado/enterInscripcion/${dni}`);
                if (value.ok) {
                    const result = await value.json();
                    if (result.redirectTo){
                        window.location.href = result.redirectTo;
                    } else {
                        console.log("No se recibió una URL de redirección");
                    }
                    
                }
            } catch (error) { console.log("Error en la petición:", error) }
        }
        recargar()
    } catch (error) {
        console.error("Error en la petición:", error);
    }
    
}