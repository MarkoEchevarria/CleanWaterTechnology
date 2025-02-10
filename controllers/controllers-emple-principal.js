import { pool } from "../db.js";

const getEmployeeName = async (req, res) => {
    try {
        const {dni} = req.params
        const result = await pool.query("SELECT * FROM empleado WHERE dni = $1", [dni])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

const enterMisCursos = async (req, res) => {
    try {
        const {dni} = req.params
        res.status(200).json({ message: "Redirect to cursos", redirectTo: `/vistas-empleado/cursos.html?dni=${dni}` });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}




const verRegistrarCursos = async (req, res) => {
    try {
        const {dni} = req.params
        res.status(200).json({ message: "Login successful", redirectTo: `/cursos.html?dni=${dni}` });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}
const enterMisCertificados = async (req, res) => {
    try {
        const {dni} = req.params
        res.status(200).json({ message: "Login successful", redirectTo: `/cursos.html?dni=${dni}` });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export { getEmployeeName,enterMisCertificados, enterMisCursos, verRegistrarCursos }