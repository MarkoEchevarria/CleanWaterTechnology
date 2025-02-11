import { Router } from "express";
import { inscribirCurso, showCursos, showCursosInscrito } from "../controllers/controllers-emple-cursos.js";
import { enterMisCertificados, enterMisCursos, getEmployeeName, enterInscripcion } from "../controllers/controllers-emple-principal.js";

const router = Router();

router.get("/showCursos/:dni", showCursos)
router.get("/showCursosInscrito/:dni", showCursosInscrito)
router.post("/inscribirCurso", inscribirCurso)
router.get("/getEmployeeName/:dni", getEmployeeName)
router.get("/enterMisCursos/:dni", enterMisCursos)
router.get("/enterInscripcion/:dni", enterInscripcion)
router.get("/enterMisCertificados/:dni", enterMisCertificados)

export default router