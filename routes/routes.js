import { Router } from "express";
import { registerEmployee, showEmployee } from "../controllers/controllers.js";
import path from "path"

const router = Router()

router.get("/", (req, res) => {
    res.send("SERVIDOR ABIERTO")
})
router.get("/showEmployee", showEmployee)
router.post("/registerEmployee", registerEmployee)

export {router}