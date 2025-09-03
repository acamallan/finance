import express from 'express';
import dotenv from 'dotenv';
import path from "path"
import bodyParser from 'body-parser';

import { db } from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(bodyParser.json());
if(process.env.NODE_ENV !== "production"){
  app.use(express.json())
  app.use(cors({
    origin:"http://localhost:5173"
  }))
}

//Check Database Connection
const [rows] = await db.query('SELECT 1 + 1 AS result');
console.log('✅ Connected to Database successfully!');

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"..frontend", "dist","index.html"))
    })
}

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});