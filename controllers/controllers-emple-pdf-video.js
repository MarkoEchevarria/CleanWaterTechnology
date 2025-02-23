const redirectPdfModulo = async (req, res) => {
    try {
        const { id_modulo, dni } = req.params
        res.status(200).json({ message: "Redirigiendo a pdf",  redirectTo: `/vistas-empleado/pdf_modulos.html?id_modulo=${id_modulo}&dni=${dni}`});
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: error.message });
    }
}

export {redirectPdfModulo}