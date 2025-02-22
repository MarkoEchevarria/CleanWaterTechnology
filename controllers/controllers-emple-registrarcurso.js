import { pool } from "../db.js"
import crypto from "crypto"
import {validateEmpleado} from "../schemas/empleados.js"

const verificarCodigo = async (req, res) => {
    try {
        const { codigo, id_curso } = req.body
        const result = await pool.query("SELECT * FROM curso WHERE id_curso = $1 AND codigo = $2 ", [id_curso, codigo])
        res.status(200).json({ message: "Codigo correcto", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: "Curso o codigo incorrecto" }); 
    }
}

const registrarCurso = async (req, res) => {
    try {
        const { dni}  = req.params
        const { id_curso } = req.body
        const result = await pool.query("INSERT INTO curso_empleado (id_curso, id_empleado) VALUES ($1, (SELECT id_empleado FROM empleado WHERE dni=$2))", [id_curso, dni]);
        res.status(200).json({ message: "Curso registrado con exito", data: result });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const volverInicio = async (req, res) => {
    try {
        const {dni} = req.params
        res.status(200).json({ redirectTo: `/emple.html?dni=${dni}` });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {registrarCurso, verificarCodigo, volverInicio}