import express from "express"
import adminRouter from "./routes/admin.routes.js"
import authRouter from "./routes/auth.routes.js"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")))
app.use("/admin", adminRouter)
app.use("/", authRouter)

app.listen(PORT, () => {
    console.log(`Servidor alojado en http://localhost:${PORT}`)
})