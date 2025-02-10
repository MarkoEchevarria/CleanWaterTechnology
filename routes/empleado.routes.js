import { Router } from "express";
import { inscribirCurso, showCursos, showCursosInscrito } from "../controllers/controllers-emple-cursos.js";
import { enterMisCertificados, enterMisCursos, getEmployeeName, verRegistrarCursos } from "../controllers/controllers-emple-principal.js";

const router = Router();

router.get("/showCursos", showCursos)
router.get("/showCursosInscrito/:dni", showCursosInscrito)
router.post("/inscribirCurso", inscribirCurso)
router.get("/getEmployeeName/:dni", getEmployeeName)
router.get("/enterMisCursos/:dni", enterMisCursos)
router.get("/verRegistrarCursos/:dni", verRegistrarCursos)
router.get("/enterMisCertificados/:dni", enterMisCertificados)

/*

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

*/
export default router