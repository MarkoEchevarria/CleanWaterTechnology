import {pool} from "../db.js";

const showCertificados = async (req, res) => {
    try {
        const {dni} = req.params
        const result = await pool.query("SELECT * FROM certificado") //, [dni]
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export { showCertificados}