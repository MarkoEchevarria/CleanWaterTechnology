import { pool } from "../db.js"
import crypto from "crypto"
import {validateEmpleado} from "../schemas/empleados.js"


const showModulos = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM modulo WHERE id_curso = $1", [id])
        result.rows.forEach((modulo) => {
            console.log(modulo)
        })
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {showModulos}

/*
const registerEmployee = async (req, res) => {
    try {
        const valid = validateEmpleado(req.body)
        
        if (valid.error) {
            return res.status(400).json({ message: valid.error.errors[0].message })
        }
        const newEmployee = {id: cryto.randomUUID(), ...valid.data}

        const verificarCorreo = await pool.query("SELECT * FROM empleado WHERE correo = $1", [newEmployee.correo])

        if (verificarCorreo.rows.length > 0) {
            return res.status(400).json({ message: "Correo ya registrado" })
        }

        const result = await pool.query(
            "INSERT INTO empleado (id_empleado, nombre, apellido, dni, correo, rol, fecha_registro, password) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $4) RETURNING *", [newEmployee.id, newEmployee.nombre, newEmployee.apellido, newEmployee.dni, newEmployee.correo, newEmployee.rol]
        )
        res.status(201).json({ message: "Query sucessful", data: result.rows[0] });
        
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}


const showOneEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM empleado WHERE id_empleado = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM empleado WHERE id_empleado = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }).redirect("/empleados/eliminar-empleado.html"); 
    }
} 

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, apellido, dni, correo, rol } = req.body
        const result = await pool.query(
            "UPDATE empleado SET nombre = $1, apellido = $2, dni = $3, correo = $4, rol = $5 WHERE id_empleado = $6 RETURNING *", [nombre, apellido, dni, correo, rol, id]
        )
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}
*/

