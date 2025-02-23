import { pool } from "../db.js"

const showReporte = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT empleado.nombre, empleado.apellido, empleado.dni, empleado.id_empleado, modulo.id_modulo, evaluacion_empleado.puntuacion, evaluacion_empleado.fecha FROM empleado INNER JOIN curso_empleado ON curso_empleado.id_empleado = empleado.id_empleado INNER JOIN curso ON curso.id_curso = curso_empleado.id_curso INNER JOIN modulo ON modulo.id_curso = curso.id_curso LEFT JOIN evaluacion_empleado ON evaluacion_empleado.id_modulo = modulo.id_modulo WHERE modulo.id_modulo=$1 ", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {showReporte}