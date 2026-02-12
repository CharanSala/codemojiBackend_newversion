import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db.js";

// 👇 ADD THESE TWO
import cron from "node-cron";
import { checkSessions } from "./cron/Send.js";

dotenv.config();

connectDB();

// 👇 ADD THIS BLOCK
cron.schedule("* * * * *", () => {
  console.log("⏰ Checking participant sessions...");
  checkSessions();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
