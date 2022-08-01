import "dotenv/config"
import express from "express"
import { startDatabase } from "database"

const app = express()

app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
  console.log("Running")
  startDatabase()
})
