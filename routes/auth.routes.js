import { Router } from "express";
import {getAdmin, getUsuario} from "../controllers/controllers-auth.js";

const router = Router();

// Rutas del empleado.-vista-admin
router.get("/getAdmin/:correo", getAdmin)
router.get("/getUsuario/:correo", getUsuario)
//router.get("/showOneEmployee/:id", showOneEmployee)

export default router;