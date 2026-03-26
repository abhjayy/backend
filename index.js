import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ MIDDLEWARE (IMPORTANT)
app.use(cors());
app.use(express.json());

// ✅ DB CONNECTION
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR ❌", err);
  } else {
    console.log("DB CONNECTED ✅");
  }
});

// ✅ HOME ROUTE
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// ✅ CONTACT ROUTE
app.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Received:", name, email, message);

    res.json({ message: "Message received ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});