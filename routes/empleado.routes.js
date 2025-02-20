import { Router } from "express";
import { inscribirCurso, showCursos, showCursosInscrito } from "../controllers/controllers-emple-cursos.js";
import { enterMisCertificados, enterMisCursos, getEmployeeName, enterInscripcion } from "../controllers/controllers-emple-principal.js";
import { showCertificados } from "../controllers/controllers-emple-certificados.js";
import { redirectModulosCurso } from "../controllers/controllers-emple-cursos-modulo.js";
import { showModulos, verDatosCurso } from "../controllers/controllers-emple-modulos.js";
import { redirectVideoModulo } from "../controllers/controllers-emple-modulo-video.js";
import { getVideo } from "../controllers/controllers-emple-video.js";
import { registrarCurso, verificarCodigo } from "../controllers/controllers-emple-registrarcurso.js";

const router = Router();

router.get("/showCursos/:dni", showCursos)
router.get("/showCursosInscrito/:dni", showCursosInscrito)
router.post("/inscribirCurso", inscribirCurso)
router.get("/getEmployeeName/:dni", getEmployeeName)
router.get("/enterMisCursos/:dni", enterMisCursos)
router.get("/enterInscripcion/:dni", enterInscripcion)
router.get("/enterMisCertificados/:dni", enterMisCertificados)
router.get("/showCertificados/:dni", showCertificados)

router.get("/redirectModulosCurso/:id_curso", redirectModulosCurso)
router.get("/showModulos/:id", showModulos)
router.get("/verDatosCurso/:id", verDatosCurso)
router.get("/redirectVideoModulo/:id_modulo", redirectVideoModulo)

router.get("/getVideo/:id", getVideo)
router.post("/registrarCurso/:dni", registrarCurso)
router.post("/verificarCodigo", verificarCodigo)

export default router