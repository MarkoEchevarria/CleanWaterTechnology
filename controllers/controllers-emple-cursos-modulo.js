import { pool } from "../db.js"
import cryto from "crypto"

const redirectModulosCurso = async (req, res) => {
    try {
        const { id_curso } = req.params
        res.status(200).json({ message: "Redirigiendo a modulos",  redirectTo: `/vistas-empleado/curso_modulos.html?id_curso=${id_curso}`});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export {redirectModulosCurso}