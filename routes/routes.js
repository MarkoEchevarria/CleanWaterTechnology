import { Router } from "express";
import { deleteEmployee, registerEmployee, showEmployee, showOneEmployee, updateEmployee } from "../controllers/controllers-admin-empleado.js";
import {deleteCurso, registerCurso, showCursos, showOneCurso, updateCurso} from "../controllers/controllers-admin-curso.js";

const router = Router();

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

export {router}