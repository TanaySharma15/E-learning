import express from "express"
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoute from "./route/user.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./route/course.route.js"
import mediaRoute from "./route/media.route.js"

dotenv.config({})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH']
}))


const PORT = process.env.PORT || 3000;

connectDb()
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

})