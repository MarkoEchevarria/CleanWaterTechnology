import { Router } from "express";
import { deleteEmployee, registerEmployee, showEmployee, showOneEmployee, updateEmployee } from "../controllers/controllers.js";

const router = Router()

router.get("/", (req, res) => {
    res.send("SERVIDOR ABIERTO")
})
router.get("/showEmployee", showEmployee)
router.get("/showOneEmployee/:id", showOneEmployee)
router.post("/registerEmployee", registerEmployee)
router.delete("/deleteEmployee/:id", deleteEmployee)
router.patch("/updateEmployee/:id", updateEmployee)
// router.post("/registerEmployee", registerCourse)

export {router}