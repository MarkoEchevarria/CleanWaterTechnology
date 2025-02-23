import { pool } from "../db.js"

const showEvaluaciones = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM modulo WHERE id_curso = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const redirectCrearEvaluacion = async (req, res) => {
    try {
        const { id_modulo } = req.params
        res.status(200).json({ message: "Redirigiendo a pagina Crear Evaluacion",  redirectTo: `/vistas-admin/crearEvaluacion.html?id_modulo=${id_modulo}`});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export {showEvaluaciones, redirectCrearEvaluacion}