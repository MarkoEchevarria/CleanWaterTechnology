import { existsSync, readFileSync, writeFileSync } from "fs"
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pool } from "../db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseFecha(fecha) {
    const [dia, mes, anio] = fecha.split('-');
    return new Date(`${anio}-${mes}-${dia}`);
}

const llenarCertificado = async (req, res) => {
    try {
        const {nombre, curso, fecha, notaFinal, numCertificado, modulos} = req.body
        
        const pdfPath = join(__dirname, "PLANTILLA CERTIFICADO.pdf");

        if (!existsSync(pdfPath)) {
            return res.status(404).json({ error: "No se encuentra la plantilla del certificado" });
        }

        const pdfDoc = await PDFDocument.load(readFileSync(pdfPath));
        const [primeraPagina, segundaPagina] = pdfDoc.getPages();
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const textoConfig = { size: 14, font: fontBold, color: rgb(0, 0, 0) };
        const posiciones = {
            nombre: [300, 270], curso: [445, 212], fecha: [390, 160],
            numCertificado: [770, 160], notaFinal: [545, 70], temario: [170, 340]
        };

        const nombres = nombre.toUpperCase();
        const cursos = curso.toUpperCase();
        const fechas = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(parseFecha(fecha)));
        const notas = notaFinal.toString();
        const numCertificados = numCertificado.toString();

        primeraPagina.drawText(nombres, { x: posiciones.nombre[0], y: posiciones.nombre[1], ...textoConfig });
        primeraPagina.drawText(cursos, { x: posiciones.curso[0], y: posiciones.curso[1], ...textoConfig });
        primeraPagina.drawText(fechas, { x: posiciones.fecha[0], y: posiciones.fecha[1], ...textoConfig });

        [primeraPagina, segundaPagina || primeraPagina].forEach(pagina => {
            pagina.drawText(numCertificados, {
                x: posiciones.numCertificado[0], y: posiciones.numCertificado[1],
                size: 15, color: rgb(0, 0, 0), rotate: degrees(90)
            });
        });

        segundaPagina.drawText(notas, { x: posiciones.notaFinal[0], y: posiciones.notaFinal[1], size: 15, color: rgb(0, 0, 0) });
        const temarioTexto = `${cursos}:\n\t${modulos.map((m, i) => `${i + 1}. ${m}`).join("\n\t")}`; 
        segundaPagina.drawText(temarioTexto, { x: posiciones.temario[0], y: posiciones.temario[1], size: 15, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();
        
        res.setHeader("Content-Disposition", `attachment; filename="Certificado_${nombres}.pdf"`);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", pdfBytes.length);
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error("❌ Error al generar el certificado:", error.message);
        res.status(500).json({ error: "Error interno al generar el certificado" });
    }
}

async function obtenerDatosCertificado (req, res) {
    try {
        const {nombre_curso, dni} = req.params
        const response = await pool.query("SELECT modulo.titulo, evaluacion_empleado.puntuacion FROM empleado INNER JOIN curso_empleado ON curso_empleado.id_empleado = empleado.id_empleado INNER JOIN curso ON curso.id_curso = curso_empleado.id_curso INNER JOIN modulo ON modulo.id_curso = curso.id_curso INNER JOIN evaluacion_empleado ON modulo.id_modulo = evaluacion_empleado.id_modulo WHERE empleado.dni = CAST($1 AS VARCHAR) AND curso.nombre = CAST( $2 AS VARCHAR )", [dni, nombre_curso])
        const modulos = response.rows.map(row => row.titulo)
        const notaFinal = response.rows.reduce((acc, row) => acc + row.puntuacion, 0) / response.rows.length
        res.json({ nombre: dni, curso: nombre_curso, fecha: new Date().toISOString(), notaFinal, modulos })
    } catch {
        console.error("Error:", error)
        res.status(500).json({ message: error.message }); 
    }
}

export {llenarCertificado, obtenerDatosCertificado}