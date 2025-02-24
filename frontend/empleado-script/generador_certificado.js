const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, degrees, StandardFonts } = require("pdf-lib");

async function llenarCertificado(datos) {
    try {
        const pdfPath = path.join(__dirname, "PLANTILLA CERTIFICADO.pdf");
        if (!fs.existsSync(pdfPath)) throw new Error("No se encuentra el archivo de plantilla.");

        const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
        const [primeraPagina, segundaPagina] = pdfDoc.getPages();
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const textoConfig = { size: 14, font: fontBold, color: rgb(0, 0, 0) };
        const posiciones = {
            nombre: [300, 270], curso: [445, 212], fecha: [390, 160],
            numCertificado: [770, 160], notaFinal: [545, 70], temario: [170, 340]
        };

        // Formateo de datos
        const nombre = datos.nombre.toUpperCase();
        const curso = datos.curso.toUpperCase();
        const fecha = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(datos.fecha));
        const nota = datos.notaFinal.toString();
        const numCertificado = datos.numCertificado.toString();

        // Escritura en la primera página
        primeraPagina.drawText(nombre, { x: posiciones.nombre[0], y: posiciones.nombre[1], ...textoConfig });
        primeraPagina.drawText(curso, { x: posiciones.curso[0], y: posiciones.curso[1], ...textoConfig });
        primeraPagina.drawText(fecha, { x: posiciones.fecha[0], y: posiciones.fecha[1], ...textoConfig });

        // Escritura del número de certificado en ambas páginas
        [primeraPagina, segundaPagina || primeraPagina].forEach(pagina => {
            pagina.drawText(numCertificado, {
                x: posiciones.numCertificado[0], y: posiciones.numCertificado[1],
                size: 12, color: rgb(0, 0, 0), rotate: degrees(90)
            });
        });

        // Escritura de la nota final en la segunda página
        segundaPagina.drawText(nota, { x: posiciones.notaFinal[0], y: posiciones.notaFinal[1], size: 12, color: rgb(0, 0, 0) });

        // Construcción y escritura del temario
        const temarioTexto = `${curso}:
${datos.modulos.map((m, i) => `${i + 1}. ${m}`).join("\n")}`;
        segundaPagina.drawText(temarioTexto, { x: posiciones.temario[0], y: posiciones.temario[1], size: 10, color: rgb(0, 0, 0) });

        // Guardado del PDF
        const outputPath = path.join(__dirname, `Certificado_${nombre}.pdf`);
        fs.writeFileSync(outputPath, await pdfDoc.save());
        console.log(`✅ Certificado generado: ${outputPath}`);
    } catch (error) {
        console.error("❌ Error al generar el certificado:", error.message);
    }
}

// 🔹 Simulación de datos extraídos de la base de datos
const datosCertificado = {
    nombre: "Juan Pérez",
    curso: "Blockchain y Criptografía",
    fecha: new Date().toISOString().split("T")[0],
    numCertificado: 2025001,
    notaFinal: 95,
    modulos: [
        "Introducción a Blockchain",
        "Conceptos de Criptografía",
        "Casos de Uso",
        "Seguridad y Normativas"
    ]
};

// Generación del certificado
llenarCertificado(datosCertificado);
