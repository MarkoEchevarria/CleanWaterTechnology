import { pool } from "../db.js";

const showCursos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM curso")
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showCursosInscrito = async (req, res) => {
    try {
        const {dni} = req.params
        const result = await pool.query("SELECT curso.nombre, curso.descripcion, curso.num_modulos, curso.codigo FROM curso INNER JOIN curso_empleado ON curso.id_curso = curso_empleado.id_curso INNER JOIN empleado ON empleado.id_empleado = curso_empleado.id_empleado WHERE empleado.dni = CAST($1 AS VARCHAR(8))", [dni])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const inscribirCurso = async (req, res) => {
    try {
        const {correo, nombreCurso} = req.body
        const result = await pool.query("INSERT INTO curso_empleado(id_curso, id_empleado, fecha_inscripcion) VALUES ( (SELECT id_curso FROM curso WHERE nombre = $1), (SELECT id_empleado FROM empleado WHERE correo = $2), NOW() )", [nombreCurso, correo])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export { showCursos, showCursosInscrito, inscribirCurso }