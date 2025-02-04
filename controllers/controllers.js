import { pool } from "../db.js"
import cryto from "crypto"
import path from "path"
import {validateEmpleado} from "../schemas/empleados.js"

const registerEmployee = async (req, res) => {
    try {
        const valid = validateEmpleado(req.body)
        
        if (valid.error) {
            return res.status(400).json({ message: valid.error.errors[0].message })
        }

        const newEmployee = {id: cryto.randomUUID(), ...valid.data}

        const result = await pool.query(
            "INSERT INTO empleado (id_empleado, nombre, apellido, dni, correo, rol, fecha_registro) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *", [newEmployee.id, newEmployee.nombre, newEmployee.apellido, newEmployee.dni, newEmployee.correo, newEmployee.rol]
        )
        res.status(201).json({ message: "Query sucessful", data: result.rows[0] });
        
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showEmployee = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM empleado")
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {registerEmployee, showEmployee}