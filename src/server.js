import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "../db.js";

dotenv.config(); // Ensure env is loaded here too

connectDB(); // ✅ Call DB connection once

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
