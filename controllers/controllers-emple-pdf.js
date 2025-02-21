import { cloudinary } from "../config.js";
import { pool } from "../db.js";
import multer from "multer";

const getPdf = async (req, res) => {
    try {
        const result = await pool.query( "SELECT * FROM evaluacion WHERE id_modulo = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.log(`No hay pdf subido en este modulo ${req.params.id}`)
    }
};

export { getPdf }