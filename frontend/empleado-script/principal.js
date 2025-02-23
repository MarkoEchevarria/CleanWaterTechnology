function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userDNI = urlParams.get('dni');
    try {
        const response = await fetch ( `empleado/getEmployeeName/${userDNI}` )
        const data = await response.json();
        if(response.ok) {
            document.getElementById("Usuario-mensaje-bienvenida").innerText = `Bienvenido ${capitalizeFirstLetter(data.data[0].nombre)} ${capitalizeFirstLetter(data.data[0].apellido)}`;
        }
    } catch (error) {
        console.log("No se recibió un ID");
    }
}

function irPaginaCurso() {
    const urlParams = new URLSearchParams(window.location.search);
    const userDNI = urlParams.get('dni');
    async function enterMisCursos() {
        try {
            const response = await fetch(`/empleado/enterMisCursos/${userDNI}`);
            if (response.ok) {
                const result = await response.json();
                window.location.href = result.redirectTo;
            }
        } catch (error) {
            console.log("Error en la petición:", error)
        }
    }
    enterMisCursos()
    
}

function irPaginaInscripcion() {
    const urlParams = new URLSearchParams(window.location.search);
    const userDNI = urlParams.get('dni');
    async function enterInscripcion() {
        try {
            const response = await fetch(`/empleado/enterInscripcion/${userDNI}`);
            if (response.ok) {
                const result = await response.json();
                window.location.href = result.redirectTo;
            }
        } catch (error) {
            console.log("Error en la petición:", error)
        }
    }
    enterInscripcion()
}

function irPaginaCertificados() {
    const urlParams = new URLSearchParams(window.location.search);
    const userDNI = urlParams.get('dni');
    async function enterCertificados() {
        try {
            const response = await fetch(`/empleado/enterMisCertificados/${userDNI}`);
            if (response.ok) {
                const result = await response.json();
                window.location.href = result.redirectTo;
            }
        } catch (error) {
            console.log("Error en la petición:", error)
        }
    }
    enterCertificados()
}