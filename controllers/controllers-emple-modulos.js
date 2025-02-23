import { pool } from "../db.js"

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

const verDatosCurso = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM curso WHERE id_curso = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const getModulo = async (req, res) => {
    try {
        const { id_modulo } = req.params
        const result = await pool.query("SELECT * FROM modulo WHERE id_modulo = $1", [id_modulo])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const getCursoByModulo = async (req, res) => {
    try {
        const { id_modulo } = req.params
        const result = await pool.query("SELECT * FROM curso WHERE id_curso = (SELECT id_curso FROM modulo WHERE id_modulo = $1)", [id_modulo])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {showModulos, verDatosCurso, getModulo, getCursoByModulo}