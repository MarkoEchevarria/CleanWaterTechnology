import { Router } from "express";
import { deleteEmployee, registerEmployee, showEmployee, showOneEmployee, updateEmployee } from "../controllers/controllers-admin-empleado.js";
import { deleteCurso, registerCurso, showCursos, showOneCurso, updateCurso} from "../controllers/controllers-admin-curso.js";
import { showExamenesSubidos, showModulos} from "../controllers/controllers-admin-modulo.js";
import { showReporte } from "../controllers/controllers-admin-reporte.js";
import { uploadVideo, getVideos, getOneVideo, deleteVideo } from "../controllers/controllers-videos.js";
import { redirectCrearEvaluacion } from "../controllers/controllers-admin-evaluacion.js";
import { getModulo } from "../controllers/controllers-admin-crearEvaluacion.js";
import { deletePdf, getOnePdf, getPdfs, uploadPdf } from "../controllers/controllers-pdfs.js";
import { revisarAdmin } from "../controllers/controllers-admin-revisar.js";
import { calificarAdmin } from "../controllers/controllers-admin-calificar.js";
import { agregarModulo, consolidarCertificado, contarModulos, eliminarModulo, listarAllCursos, listarCursos, listarDnis, listarModulos, obtenerNotas } from "../controllers/controllers-admin-auto-certificados.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Admin principal page")
})

// Rutas del empleado-vista-admin
router.get("/showEmployee", showEmployee)
router.get("/showOneEmployee/:id", showOneEmployee)
router.post("/registerEmployee", registerEmployee)
router.delete("/deleteEmployee/:id", deleteEmployee)
router.patch("/updateEmployee/:id", updateEmployee)

// Rutas del curso-vista-admin
router.get("/showCursos", showCursos)
router.get("/showOneCurso/:id", showOneCurso)
router.post("/registerCurso", registerCurso)
router.delete("/deleteCurso/:id", deleteCurso)
router.patch("/updateCurso/:id", updateCurso)

// Rutas del modulo-vista-admin
router.get("/showModulos/:id", showModulos)
router.get("/showExamenesSubidos/:dni&:id_modulo", showExamenesSubidos)

// Rutas del resultado-vista-admin
router.get("/showReporte/:id", showReporte)

// Rutas del para subir videos
router.post("/upload", uploadVideo);
router.get("/videos", getVideos);
router.get("/video/:id", getOneVideo);
router.delete("/deleteVideo/:id", deleteVideo);

// Rutas del para subir pdfs
router.post("/uploadpdf", uploadPdf);
router.get("/pdfs", getPdfs);
router.get("/pdf/:id", getOnePdf);
router.delete("/deletePdf/:id", deletePdf);

router.get("/revisarAdmin/:id_empleado&:id_modulo", revisarAdmin)

router.get("/getModulo/:id_modulo", getModulo)
router.get("/redirectCrearEvaluacion/:id_modulo", redirectCrearEvaluacion)

router.post("/calificarAdmin/:id_empleado&:id_modulo&:puntuacion", calificarAdmin)
router.get("/obtenerNotas/:dni", obtenerNotas)
router.post("/consolidarCertificado", consolidarCertificado)
router.get("/listarDnis", listarDnis)
router.get("/contarModulos/:id_curso", contarModulos)
router.get("/listarCursos", listarCursos)
router.get("/listarAllCursos", listarAllCursos)
router.post("/agregarModulo", agregarModulo)
router.get("/listarModulos/:id_curso", listarModulos)
router.delete("/eliminarModulo/:id_modulo", eliminarModulo)

export default router;
