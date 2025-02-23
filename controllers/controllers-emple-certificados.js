import {pool} from "../db.js";

const showCertificados = async (req, res) => {
    try {
        const {dni} = req.params
        const result = await pool.query("SELECT certificado.id_certificado, certificado.fecha_emision, curso.nombre AS nombre_curso, curso.num_modulos, empleado.nombre, empleado.apellido, empleado.dni, empleado.correo, curso.descripcion FROM certificado INNER JOIN curso_empleado On certificado.id_curso_empleado=curso_empleado.id_curso_empleado INNER JOIN curso ON curso.id_curso = curso_empleado.id_curso INNER JOIN empleado ON empleado.id_empleado = curso_empleado.id_empleado WHERE empleado.dni = $1", [dni])
        res.status(200).json({ message: "Query sucessful", data: result.rows});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export { showCertificados}