import { pool } from "../db.js";

const getVideo = async (req, res) => {
    try {
        const result = await pool.query( "SELECT * FROM multimedia WHERE id_modulo = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.log(`NO hay video subido en este modulo ${req.params.id}`)
    }
};

export { getVideo };