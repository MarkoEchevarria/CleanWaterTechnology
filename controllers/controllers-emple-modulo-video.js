import { pool } from "../db.js"
import cryto from "crypto"

const redirectVideoModulo = async (req, res) => {
    try {
        const { id_modulo, dni } = req.params
        res.status(200).json({ message: "Redirigiendo a video",  redirectTo: `/vistas-empleado/video_modulos.html?id_modulo=${id_modulo}&dni=${dni}`});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export {redirectVideoModulo}