function formatearFecha(fechaISO) {
    if (fechaISO === null) {
        return '---'
    } else {
        const [year, month, day] = new Date(fechaISO).toISOString().split("T")[0].split("-");
        return `${day}-${month}-${year}`;
    }
}

function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

document.addEventListener("DOMContentLoaded", function() {

    async function cargarReporteEvaluaciones() {
        try {
            const response = await fetch("/admin/showCursos");
            const cursos = await response.json();
            const container = document.getElementById("cursosContainer");
            const noEvaluacionesMensaje = document.getElementById("noEvaluacionesMensaje");

            if (response.ok && cursos.data && cursos.data.length >0){
                noEvaluacionesMensaje.style.display = "none"
                cursos.data.forEach(curso => {
                    
                    const cursoElement = document.createElement("details");
                    cursoElement.classList.add("bg-white", "shadow-md", "rounded-lg", "p-5", "border-l-8", "border-teal-500");
                    cursoElement.innerHTML = `<summary class='text-2xl font-bold text-teal-800 cursor-pointer'>${curso.nombre}</summary>`;
                    
                    const modulosContainer = document.createElement("div");
                    modulosContainer.classList.add("mt-3", "space-y-3");
                    
                    async function cargarModulos() {
                        const response_modulo = await fetch(`/admin/showModulos/${curso.id_curso}`)
                        const modulos = await response_modulo.json()
                        
                        if (modulos.data.length > 0) {
                            modulos.data.forEach(modulo => {
                                const moduloElement = document.createElement("details");
                                moduloElement.classList.add("p-3", "bg-gray-100", "rounded-md", "shadow-sm");
                                moduloElement.innerHTML = `<summary class='text-gray-700 font-medium cursor-pointer'>${modulo.titulo}</summary>`;
                               
                                async function cargarNotas() {
                                    const response_notas = await fetch (`/admin/showReporte/${modulo.id_modulo}`)
                                    const nota = await response_notas.json()
                                    const table = document.createElement("table");
                                        table.classList.add("mt-3", "w-full", "border", "border-gray-300", "text-gray-700");
                                    if ( response_notas.ok && nota.data && nota.data.length > 0 ) {
                                        
                                        table.innerHTML = `
                                            <thead class='bg-teal-600 text-white'>
                                                <tr>
                                                    <th class='p-2'>Empleado</th>
                                                    <th class='p-2'>DNI</th>
                                                    <th class='p-2'>Fecha Examen</th>
                                                    <th class='p-2'>Nota</th>
                                                    <th class='p-2'>Calificar</th>
                                                </tr>
                                            </thead>
                                            `
                                        const tbody_div = document.createElement("tbody");
                                        nota.data.forEach( item => {
                                            const nota_fila = document.createElement("tr"); 
                                            nota_fila.setAttribute("class", "border")
                                            if (item.puntuacion === null) {
                                                nota_fila.innerHTML = `
                                                    <td class='p-2'>${capitalizeFirstLetter(item.nombre)} ${capitalizeFirstLetter(item.apellido)}</td>
                                                    <td class='p-2'>${item.dni}</td>
                                                    <td class='p-2'>${formatearFecha(item.fecha)}</td>
                                                    <td class='p-2 tr-puntuacion'> -- </td>
                                                    <td class='p-2'> <button class="btn btn-primary modify-btn" style="background-color: #4CAF50" onclick="revisar('${item.id_empleado}', ${item.id_modulo})"> Revisar </button> </td>
                                                `;
                                            } else {
                                                nota_fila.innerHTML = `
                                                    <td class='p-2'>${item.nombre}</td>
                                                    <td class='p-2'>${item.dni}</td>
                                                    <td class='p-2'>${formatearFecha(item.fecha)}</td>
                                                    <td class='p-2 tr-puntuacion'>${item.puntuacion}</td>
                                                    <td class='p-2'> <button class="btn btn-primary modify-btn" style="background-color: #4CAF50" onclick="revisar('${item.id_empleado}', ${item.id_modulo})"> Revisar </button> </td>
                                            `; 
                                            }
                                            tbody_div.appendChild(nota_fila)
                                        } 
                                            
                                        );

                                        table.appendChild(tbody_div)

                                    } else {
                                        table.innerHTML = '<h2>No hay notas para este modulo</h2>'
                                    }

                                    moduloElement.appendChild(table);
                                }
                                cargarNotas()
                                
                                
                                modulosContainer.appendChild(moduloElement);

                                
                            });
                        } else {
                            console.log("Algo salio mal con el if de modulos")
                        }
                        
                    }
                    cargarModulos()
                    
                    cursoElement.appendChild(modulosContainer);
                    container.appendChild(cursoElement);
                })
            };
        } catch (error) {
            console.error("Error en la petición:", error);
            noEvaluacionesMensaje.style.display = "block";
            noEvaluacionesMensaje.textContent = "Hubo un error al cargar los módulos.";
        }
        
        

    }

    cargarReporteEvaluaciones();

});

function revisar(id_empleado, id_modulo) {
    window.location.href = `/vistas-admin/revisar.html?id_empleado=${id_empleado}&id_modulo=${id_modulo}`
}