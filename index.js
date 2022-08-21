import "dotenv/config"
import "./database/db.js"
import express from "express"
import authRouter from './routes/routes.js'
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js"



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter)


//para probar el login/token
app.use(express.static("public"));


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("🔥🔥🔥🔥 http://localhost:" + PORT));