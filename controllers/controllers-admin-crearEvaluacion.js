import { pool } from "../db.js"

const getModulo = async (req, res) => {
    try {
        const { id_modulo } = req.params
        const result = await pool.query("SELECT * FROM modulo WHERE id_modulo = $1", [id_modulo])
        result.rows.forEach((modulo) => {
            console.log(modulo)
        })
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}
export {getModulo}