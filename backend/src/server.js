import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import path from 'path';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimitter.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 / path-to-regexp v6 no longer supports "*" style wildcard strings.
  // Use a regular expression to match all routes for the SPA fallback.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});