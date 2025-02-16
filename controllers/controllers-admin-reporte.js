import { pool } from "../db.js"
import crypto from "crypto"
import {validateEmpleado} from "../schemas/empleados.js"


const showReporte = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT empleado.nombre, empleado.dni, resultado_evaluacion.fecha, resultado_evaluacion.puntuacion FROM empleado INNER JOIN curso_empleado ON curso_empleado.id_empleado = empleado.id_empleado INNER JOIN curso ON curso_empleado.id_curso = curso.id_curso INNER JOIN modulo ON curso.id_curso = modulo.id_curso INNER JOIN evaluacion ON evaluacion.id_modulo = modulo.id_modulo INNER JOIN resultado_evaluacion ON evaluacion.id_evaluacion = resultado_evaluacion.id_evaluacion WHERE modulo.id_modulo = $1", [id])
        result.rows.forEach((modulo) => {
            console.log(modulo)
        })
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {showReporte}

/**
SELECT empleado.nombre, empleado.dni, resultado_evaluacion.fecha, resultado_evaluacion.puntuacion FROM empleado INNER JOIN curso_empleado ON curso_empleado.id_empleado = empleado.id_empleado INNER JOIN curso ON curso_empleado.id_curso = curso.id_curso INNER JOIN modulo ON curso.id_curso = modulo.id_curso INNER JOIN evaluacion ON evaluacion.id_modulo = modulo.id_modulo INNER JOIN resultado_evaluacion ON evaluacion.id_evaluacion = resultado_evaluacion.id_evaluacion WHERE modulo.id = ...

empleado, dni, fecha, nota
**/