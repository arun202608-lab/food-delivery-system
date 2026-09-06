import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import "dotenv/config"

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token", "Authorization"]
}))

app.get("/", (req, res) => {
    res.status(200).send("API Working Now")
})

app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

const startServer = async () => {
    try {
        await connectDB()

        app.listen(port, "0.0.0.0", () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log("Database connection failed:", error)
    }
}

startServer()