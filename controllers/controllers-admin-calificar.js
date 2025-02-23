import { pool } from "../db.js"

const calificarAdmin = async (req, res) => {
    try {
        const { id_empleado, id_modulo } = req.params
        const { puntuacion } = req.body
        const result = await pool.query("UPDATE evaluacion_empleado SET puntuacion = $1 WHERE id_empleado = $2 AND id_modulo = $3", [puntuacion, id_empleado, id_modulo])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export { calificarAdmin }