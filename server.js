import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth.route.js"
import cors from "cors"
import { connectDB } from "./db.js"
import { studentRouter } from "./routes/student.route.js"
import { masterRouter } from "./routes/accountMaster.route.js"
import { openingBalanceRouter } from "./routes/openingBalance.route.js"
import { journalRouter } from "./routes/journal.route.js"



const app = express()
dotenv.config()
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/api", authRouter)
app.use("/api", studentRouter)
app.use("/api", masterRouter)
app.use("/api", openingBalanceRouter)
app.use("/api", journalRouter)

app.get("/", async (req, res)=>{
    try {
        res.status(200).json({message:"hello dude"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.listen(process.env.PORT, async()=>{
    console.log(`the server is running on http://localhost:${process.env.PORT}`)
})