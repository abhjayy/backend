import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(cors())

const pool = mysql.createConnection({
  host: "mainline.proxy.rlwy.net",
  user: "root",
  password: "coTdzjrPFwxGVMjwxeNQwNISVbrUqtgR",
  database: "railway",
  port: 46974
})

pool.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err)
  } else {
    console.log("✅ DB CONNECTED")
  }
})

app.get("/", (req, res) => {
  res.send("Server working ✅")
})

app.listen(5000, () => console.log("Server running 🚀"))