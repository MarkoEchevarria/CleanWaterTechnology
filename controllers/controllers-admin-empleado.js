import { pool } from "../db.js"
import cryto from "crypto"
import {validateEmpleado} from "../schemas/empleados.js"

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

        const result = await pool.query( "INSERT INTO empleado (id_empleado, nombre, apellido, dni, correo, fecha_registro, password) VALUES ($1, $2, $3, $4, $5, NOW(), $4) RETURNING *", [newEmployee.id, newEmployee.nombre, newEmployee.apellido, newEmployee.dni, newEmployee.correo])
        res.status(201).json({ message: "Query sucessful", data: result.rows[0] });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showEmployee = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM empleado")
        res.status(200).json({ message: "Query sucessful", data: result.rows});
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
        const { nombre, apellido, dni, correo} = req.body
        const result = await pool.query( "UPDATE empleado SET nombre = $1, apellido = $2, dni = $3, correo = $4 WHERE id_empleado = $5 RETURNING *", [nombre, apellido, dni, correo, id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {registerEmployee, showEmployee, deleteEmployee, updateEmployee, showOneEmployee}