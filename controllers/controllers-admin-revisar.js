import { cloudinary } from "../config.js";
import { pool } from "../db.js";
import multer from "multer";

const revisarAdmin = async (req, res) => {
    try {
        const {id_empleado, id_modulo} = req.params;
        const result = await pool.query( "SELECT evaluacion_empleado.url FROM empleado INNER JOIN curso_empleado ON empleado.id_empleado=curso_empleado.id_empleado INNER JOIN curso ON curso.id_curso=curso_empleado.id_curso INNER JOIN modulo ON modulo.id_curso=curso.id_curso INNER JOIN evaluacion_empleado ON evaluacion_empleado.id_modulo=modulo.id_modulo WHERE empleado.id_empleado= CAST($1 AS UUID) AND modulo.id_modulo=$2", [id_empleado, id_modulo]);
        res.json(result.rows);
    } catch (error) {
        console.log(`No hay pdf subido en este modulo ${req.params.id}`)
    }
};

export { revisarAdmin }