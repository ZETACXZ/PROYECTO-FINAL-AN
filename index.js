
import "./database/db.js"
import express from "express"
import authRouter from './routes/routes.js'
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use(express.static("public"));


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("🔥🔥🔥🔥 http://localhost:" + PORT));