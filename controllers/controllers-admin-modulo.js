import { pool } from "../db.js"

const showModulos = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM modulo WHERE id_curso = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showExamenesSubidos = async (req, res) => {
    try {
        const { dni, id_modulo } = req.params
        const result = await pool.query("SELECT * FROM evaluacion_empleado WHERE id_empleado = ( SELECT id_empleado FROM empleado WHERE dni = $1 ) AND id_modulo = $2 ", [dni, id_modulo])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {showModulos, showExamenesSubidos}