import { Router } from "express";
import {enterUsuario, getAdmin, getUsuario} from "../controllers/controllers-auth.js";

const router = Router();

// Rutas del empleado.-vista-admin
router.get("/getAdmin/:correo", getAdmin)
router.get("/getUsuario/:correo", getUsuario)
router.post("/enterUsuario", enterUsuario)
//router.get("/showOneEmployee/:id", showOneEmployee)

export default router;