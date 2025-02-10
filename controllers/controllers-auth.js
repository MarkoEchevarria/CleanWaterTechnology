import { pool } from "../db.js"
import cryto from "crypto"

const getAdmin = async (req, res) => {
    try {
        const { correo } = req.params
        const result = await pool.query("SELECT * FROM admin WHERE correo = $1", [correo])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const getUsuario = async (req, res) => {
    try {
        const { correo } = req.params
        const result = await pool.query("SELECT * FROM empleado WHERE correo = $1", [correo])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const enterUsuario = async (req, res) => {
    try { 
        const { dni } = req.body
        res.status(200).json({ message: "Login successful", redirectTo: `/emple.html?dni=${dni}` });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export {getAdmin, getUsuario, enterUsuario}