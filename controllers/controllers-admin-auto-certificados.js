import { pool } from "../db.js"

const obtenerNotas = async (req, res) => {
    try {
        const { dni } = req.params

        const result = await pool.query("SELECT curso.id_curso, curso.nombre, curso.num_modulos, CASE		WHEN COUNT (evaluacion_empleado.puntuacion)< COUNT (*) THEN NULL		ELSE AVG(evaluacion_empleado.puntuacion)	END AS promedio FROM curso FULL JOIN modulo ON curso.id_curso = modulo.id_curso FULL JOIN evaluacion_empleado  ON modulo.id_modulo = evaluacion_empleado.id_modulo FULL JOIN curso_empleado ON curso_empleado.id_curso = curso.id_curso FULL JOIN empleado ON empleado.id_empleado = curso_empleado.id_empleado WHERE dni = $1 GROUP BY curso.id_curso; ", [dni])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const consolidarCertificado = async (req, res) => {
    try {
        const { dni, id_curso } = req.body
        const result = await pool.query( "INSERT INTO certificado(id_curso_empleado, fecha_emision) VALUES ((SELECT id_curso_empleado FROM curso_empleado WHERE id_empleado = (SELECT id_empleado FROM empleado WHERE dni = CAST($1 AS VARCHAR)) AND id_curso = $2), NOW()) RETURNING *;", [dni, id_curso])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const listarDnis = async (req, res) => {
    try {
        const result = await pool.query("SELECT dni FROM empleado;")
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const contarModulos = async (req, res) => {
    try {
        const { id_curso } = req.params
        const result = await pool.query("UPDATE curso SET num_modulos = (SELECT COUNT(*) FROM modulo WHERE id_curso = CAST($1 AS UUID) ) WHERE id_curso = CAST($1 AS UUID) ", [id_curso])
        res.status(200).json({ message: "Query sucessful", data: result});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const listarCursos = async (req, res) => {
    try {
        const result = await pool.query("SELECT id_curso FROM curso;")
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export { obtenerNotas, consolidarCertificado, listarDnis, listarCursos, contarModulos }