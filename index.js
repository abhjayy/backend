import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
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

// ✅ CONTACT ROUTE (FINAL FIXED)
app.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Received:", name, email, message);

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // (Optional DB insert - safe to keep or remove)
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.log("DB INSERT ERROR ❌", err);
        return res.status(500).json({ message: "Database error ❌" });
      }

      return res.status(200).json({ message: "Message saved ✅" });
    });

  } catch (err) {
    console.log("SERVER ERROR ❌", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});