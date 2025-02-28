import { pool } from "../db.js"
import cryto from "crypto"
import {validateCurso} from "../schemas/cursos.js"

const registerCurso = async (req, res) => {
    try {
        const valid = validateCurso(req.body)
        if (valid.error) {
            return res.status(400).json({ message: valid.error.errors[0].message })
        }

        const valores = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'];
        let codigo = '';
        for (let i = 0; i < 10; i++) {
            codigo += valores[Math.floor(Math.random() * valores.length)];
        }

        const newCurso = {id: cryto.randomUUID(), ...valid.data}
        const result = await pool.query(
            "INSERT INTO curso (id_curso, nombre, descripcion, fecha_creacion, codigo) VALUES ($1, $2, $3, NOW()::DATE, $4 ) RETURNING *", [newCurso.id, newCurso.nombre, newCurso.descripcion, codigo]
        )
        res.status(201).json({ message: "Query sucessful", data: result.rows[0] });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showCursos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM curso")
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const showOneCurso = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM curso WHERE id_curso = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body
        const result = await pool.query("UPDATE curso SET nombre = $1, descripcion = $3 WHERE id_curso = $4 RETURNING *", [nombre, descripcion, id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM curso WHERE id_curso = $1", [id])
        res.status(200).json({ message: "Query sucessful", data: result.rows });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }).redirect("/vistas-admin/curso.html"); 
    }
} 

export {registerCurso, showCursos, deleteCurso, updateCurso, showOneCurso}