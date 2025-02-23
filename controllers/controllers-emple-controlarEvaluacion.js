import { cloudinary } from "../config.js";
import { pool } from "../db.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("pdf");

const uploadPdf = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        if (!req.file) {
            return res.status(400).json({ message: "No se proporcionó un archivo" });
        }

        const verificationModule = await pool.query("SELECT * FROM evaluacion_empleado WHERE id_modulo = $1 AND id_empleado = (SELECT id_empleado FROM empleado WHERE dni=$2)", [req.body.id_modulo, req.body.dni]);

        if (verificationModule.rows.length > 0) {
            console.log("Ya existe un pdf para este módulo");
            return res.status(400).json({ message: "Ya existe un pdf para este módulo" });
        }

        console.log("Archivo recibido: ", req.file);

        console.log("Subiendo pdf a Cloudinary...");
        const result = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                { resource_type: "raw", format: "pdf" },
                (error, cloudinaryResponse) => {
                    if (error) {
                        console.error("Error al subir a Cloudinary:", error);
                        reject(error);
                    } else {
                        console.log("Respuesta de Cloudinary:", cloudinaryResponse);
                        resolve(cloudinaryResponse);
                    }
                }
            ).end(req.file.buffer);
        });
    
        console.log("Pdf subido a Cloudinary:", result); 

        console.log("Insertando en base de datos...");

        const dbResponse = await pool.query(
            "INSERT INTO evaluacion_empleado (id_modulo, url, public_id, id_empleado, fecha) VALUES (CAST($1 AS INT), $2, $3, (SELECT id_empleado FROM empleado WHERE dni=$4), NOW() ) ", [req.body.id_modulo, result.secure_url, result.public_id, req.body.dni]
        );
        console.log("Respuesta de la base de datos:", dbResponse.rows);
        
        res.json({ message: "pdf subido", pdf: dbResponse.rows[0] });
    } catch (error) {
        console.error("Error al subir el pdf:", error);
        res.status(500).json({ error: error.message });
    }
};

const getPdfs = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM evaluacion_empleado ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOnePdf = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM evaluacion_empleado WHERE id_modulo = CAST($1 AS INT) AND id_empleado= (SELECT id_empleado FROM empleado WHERE dni=$2)", [req.params.id_modulo, req.params.dni]);
        res.json(result.rows);
    } catch (error) {
        console.log(`NO hay pdf subido en este modulo ${req.params.id}`)
    }
};

const deletePdf = async (req, res) => {
    try {
        const getPublicId= await pool.query("SELECT public_id FROM evaluacion_empleado WHERE id_evaluacion_empleado = CAST($1 AS INT) ", [req.params.id_evaluacion_empleado]);
        if (getPublicId.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró el pdf" });
        }
        await cloudinary.v2.uploader.destroy(getPublicId.rows[0].public_id, { resource_type: "raw" });
        const result = await pool.query("DELETE FROM evaluacion_empleado WHERE id_evaluacion_empleado = CAST($1 AS INT) RETURNING *", [req.params.id_evaluacion_empleado]);

        res.json({ message: "Pdf eliminado" , id_public: getPublicId.rows[0].public_id, result: result.rows});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { uploadPdf, getPdfs, getOnePdf, deletePdf};