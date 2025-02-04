import express, { Router } from "express"
import { router } from "./routes/routes.js"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url";

const PORT = 3000
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(new URL(import.meta.url).pathname)
const __dirname = path.dirname(__filename);

const app = express()

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")))
app.use(router)

app.listen(PORT, () => {
    console.log(`Servidor alojado en http://localhost:${PORT}`)
})