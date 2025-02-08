function openModalAdmin() {
    document.getElementById('loginModalAdmin').style.display = "block";
}
function openModalUsuario() {
    document.getElementById('loginModalUsuario').style.display = "block";
}
function closeModalAdmin() {
    document.getElementById('loginModalAdmin').style.display = "none";
}
function closeModalUsuario() {
    document.getElementById('loginModalUsuario').style.display = "none";
}

function validateLoginAdmin() {
    let correo = document.getElementById('correoAdmin').value;
    let password = document.getElementById('passwordAdmin').value;

    async function verificarAdmin() {
        try {
            const value = await fetch(`/getAdmin/${correo}`);
            const data = await value.json();
            
            if (data.data[0].password === password) {
                console.log("Login exitoso")
                window.location.href = "admin.html";
            } else {
                console.log("Contraseña incorrecta")
            }
        } catch (error) {
                console.error("Error en la petición:", error)
            }
    }
    verificarAdmin()
}

function validateLoginUsuario() {
    let correo = document.getElementById('correoUsuario').value;
    let password = document.getElementById('passwordUsuario').value;

    async function verificarUsuario() {
        try {
            const value = await fetch(`/getUsuario/${correo}`);
            const data = await value.json();
            
            if (data.data[0].password === password) {
                console.log("Login exitoso")
                window.location.href = "emple.html";
            } else {
                console.log("Contraseña incorrecta")
            }
        } catch (error) {
                console.error("Error en la petición:", error)
            }
    }
    verificarUsuario()
}