import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR ❌", err);
  } else {
    console.log("DB CONNECTED ✅");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server + DB Connected ✅🔥");
});

// API ROUTE (IMPORTANT)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});