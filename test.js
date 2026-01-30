// import express from "express";
// import compiler from "compilex";
// import cors from "cors";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import Participant from "./Mongo.js";
// import crypto, { randomBytes } from "crypto";
// import connectDB from "./db.js";
// import moment from "moment-timezone";
// import dotenv from "dotenv";
// import { v4 as uuidv4 } from "uuid";
// import fs from "fs";
// import path from "path";

// dotenv.config();

// const app = express();
// // const port = 5000;

// app.use(express.urlencoded({ extended: true }));

// // Initialize compilex
// const options = { stats: true };
// compiler.init(options);

// // Configure Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json());
// let currentUserEmail = "";

// // const printParticipants = async () => {
// //     try {
// //         // Use findOne and correct case for email
// //         const participant = await Participant.findOne({ email: "Charansala@gmail.com" });
// //         if (participant) {
// //             console.log("Participant Data:", participant.password);
// //         } else {
// //             console.log("No participant found with this email.");
// //         }
// //     } catch (err) {
// //         console.error("Error Fetching Participant:", err);
// //     }
// // };

// // printParticipants();
// app.post("/update-timer", async (req, res) => {
//   const { email, time } = req.body;

//   if (!email || time === undefined) {
//     return res.status(400).json({ error: "Email and time are required" });
//   }

//   try {
//     let timer = await Participant.findOne({ email });
//     if (!timer) {
//       timer = new Participant({ email, timeLeft: time });
//     } else {
//       timer.timeLeft = time;
//     }
//     await timer.save();
//     res.status(200).json({ message: "Time updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update time" });
//   }
// });
// app.post("/update-level2timer", async (req, res) => {
//   const { email, time } = req.body;

//   if (!email || time === undefined) {
//     return res.status(400).json({ error: "Email and time are required" });
//   }

//   try {
//     let timer = await Participant.findOne({ email });
//     if (!timer) {
//       timer = new Participant({ email, timeLeft: time });
//     } else {
//       timer.level2timeLeft = time;
//     }
//     await timer.save();
//     res.status(200).json({ message: "Time updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update time" });
//   }
// });

// app.post("/update-level3timer", async (req, res) => {
//   const { email, time } = req.body;

//   if (!email || time === undefined) {
//     return res.status(400).json({ error: "Email and time are required" });
//   }

//   try {
//     let timer = await Participant.findOne({ email });
//     if (!timer) {
//       timer = new Participant({ email, timeLeft: time });
//     } else {
//       timer.level3timeLeft = time;
//     }
//     await timer.save();
//     res.status(200).json({ message: "Time updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update time" });
//   }
// });

// app.post("/update-level1submissiontime", async (req, res) => {
//   const { email, time } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }
//   try {
//     const participant = await Participant.findOne({ email });
//     if (!participant) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     participant.round2submissiontime = time;
//     await participant.save();

//     res.status(200).json({ msg: "saved" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });
// app.post("/update-level2submissiontime", async (req, res) => {
//   const { email, time } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }
//   try {
//     const participant = await Participant.findOne({ email });
//     if (!participant) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     participant.round1submissiontime = time;
//     await participant.save();

//     res.status(200).json({ msg: "saved" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });

// app.post("/update-level3submissiontime", async (req, res) => {
//   const { email, time } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }
//   try {
//     const participant = await Participant.findOne({ email });
//     if (!participant) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     participant.round3submissiontime = time;
//     await participant.save();

//     res.status(200).json({ msg: "saved" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });

// app.get("/get-timer", async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   try {
//     const timer = await Participant.findOne({ email });
//     if (!timer) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     res.status(200).json({ timeLeft: timer.timeLeft });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });
// app.get("/get-level2timer", async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   try {
//     const timer = await Participant.findOne({ email });
//     if (!timer) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     res.status(200).json({ timeLeft: timer.level2timeLeft });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });

// app.get("/get-level3timer", async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   try {
//     const timer = await Participant.findOne({ email });
//     if (!timer) {
//       return res.status(404).json({ error: "Timer not found" });
//     }

//     res.status(200).json({ timeLeft: timer.level3timeLeft });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch time" });
//   }
// });

// app.post("/register", async (req, res) => {
//   try {
//     console.log("Received Data:", req.body); // Debugging log

//     const { name, email } = req.body;
//     if (!name || !email) {
//       return res.status(400).json({ error: "Name and Email are required!" });
//     }

//     const newParticipant = new Participant({ name, email });
//     await newParticipant.save();

//     res.status(201).json({
//       message: "✅ Registration Successful",
//       participant: newParticipant,
//     });
//   } catch (error) {
//     console.error("❌ Error inserting participant:", error);

//     if (error.code === 11000) {
//       res.status(400).json({ error: "❌ Email already registered!" });
//     } else {
//       res.status(500).json({ error: "❌ Server Error" });
//     }
//   }
// });

// app.post("/connect", async (req, res) => {
//   try {
//     const { emails, name } = req.body;
//     const email = emails[0];

//     if (!email || !name) {
//       return res.status(400).json({ error: "Email and Name are required" });
//     }

//     // Check if participant already exists
//     const existingParticipant = await Participant.findOne({ email });

//     if (existingParticipant) {
//       return res.status(400).json({ error: "Participant already exists" });
//     }

//     // Create a new participant
//     const newParticipant = new Participant({ email, name, points: 0 });

//     // Save to database
//     await newParticipant.save();

//     res.status(201).json({
//       message: "Participant added successfully",
//       participant: newParticipant,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Helper function to convert HH:MM:SS to total seconds


// app.post("/getSubmittedCode", async (req, res) => {
//   try {
//     // Find the participant by email
//     const participant = await Participant.findOne({ email: currentUserEmail });

//     if (!participant) {
//       return res.status(404).send({ message: "Participant not found" });
//     }

//     // Send back the submittedCode if participant is found
//     res
//       .status(200)
//       .send({ success: true, submittedCode: participant.submittedCode });
//   } catch (error) {
//     res.status(500).send({
//       message: "Error retrieving submitted code",
//       error: error.message,
//     });
//   }
// });

// app.get("/getround2submissiontime", async (req, res) => {
//   try {
//     const { email } = req.query; // Get email from query parameters

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const participant = await Participant.findOne({ email: email });

//     if (!participant) {
//       return res.status(404).send({ message: "Participant not found" });
//     }

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Send back the Round 2 submission time
//     res
//       .status(200)
//       .json({ success: true, subtime2: participant.round2submissiontime });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving submission time",
//       error: error.message,
//     });
//   }
// });

// app.get("/getround3submissiontime", async (req, res) => {
//   try {
//     const { email } = req.query; // Retrieve email from query parameters

//     if (!email) {
//       return res.status(400).send({ message: "Email parameter is required" });
//     }
//     // Find the participant by email
//     const participant = await Participant.findOne({ email: email });

//     if (!participant) {
//       return res.status(404).send({ message: "Participant not found" });
//     }

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Send back the Round 2 submission time
//     res
//       .status(200)
//       .json({ success: true, subtime3: participant.round3submissiontime });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving submission time",
//       error: error.message,
//     });
//   }
// });

// app.post("/saveCode", async (req, res) => {
//   const { submittedCode } = req.body;

//   try {
//     // Find participant by ID and update their record with the submitted code
//     const participant = await Participant.findOne({ email: currentUserEmail });

//     if (!participant) {
//       return res.status(404).send({ message: "Participant not found" });
//     }

//     // Save the code in the 'submittedCode' field of the participant
//     participant.submittedCode = submittedCode;
//     await participant.save();

//     res.status(200).send({ message: "Code saved successfully" });
//   } catch (error) {
//     res.status(500).send({
//       message: "Error saving code to the database",
//       error: error.message,
//     });
//   }
// });

// app.use(express.json());

// app.post("/participantverify", async (req, res) => {
//   try {
//     // console.log("🔍 Request Body:", req.body); // Debugging output

//     if (!req.body) {
//       return res
//         .status(400)
//         .json({ message: "Invalid request! No request body received." });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required!" });
//     }

//     console.log("📧 Email:", email, "🔑 Password:", password);

//     const participant = await Participant.findOne({ email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found!" });
//     }

//     if (participant.password != password) {
//       return res.status(401).json({ message: "Incorrect password!" });
//     }

//     if (participant.randomnumber === 0) {
//       participant.randomnumber = Math.floor(Math.random() * 5) + 1;
//       await participant.save();
//     }

//     console.log("✅ Participant Verified:", participant.email);

//     res.json({
//       message: "Login successful!",
//       email: participant.email, // ✅ Send only the email
//     });
//   } catch (error) {
//     console.error("❌ Error verifying participant:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.post("/check-round2", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Participant.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.round2submissiontime = "0";
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Round 2 submission time reset successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/check-round1", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Participant.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.round1submissiontime = "0";
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Round 2 submission time reset successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/check-round3", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await Participant.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.round3submissiontime = "0";
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Round 3 submission time reset successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/store-submission-time", async (req, res) => {
//   const { submissionTime } = req.body;

//   try {
//     const participant = await Participant.findOne({ email: currentUserEmail });

//     if (!participant) {
//       return res.status(404).send({ message: "Participant not found" });
//     }

//     // Save the code in the 'submittedCode' field of the participant
//     participant.round2submissiontime = submissionTime;
//     await participant.save();

//     res.status(200).json({
//       message: "Submission time stored successfully",
//       updatedParticipant,
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Failed to store submission time" });
//   }
// });

// app.post("/updatepoints", async (req, res) => {
//   const { points, email } = req.body; // Reduce 10 points for hint

//   try {
//     // Find participant by email
//     const participant = await Participant.findOne({ email: email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Ensure points don't go negative
//     const updatedPoints = participant.points - points;

//     // Update points in the database
//     participant.points = updatedPoints;
//     await participant.save();

//     participant.hint1 = false;
//     await participant.save();

//     participant.hint2 = true;
//     await participant.save();

//     return res.status(200).json({ points: participant.points });
//   } catch (error) {
//     console.error("Error updating points:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.post("/updatepoints1", async (req, res) => {
//   const { points, email } = req.body; // Reduce 10 points for hint

//   try {
//     // Find participant by email
//     const participant = await Participant.findOne({ email: email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Ensure points don't go negative
//     const updatedPoints = participant.points - points;

//     // Update points in the database
//     participant.points = updatedPoints;
//     await participant.save();

//     participant.hint2 = false;
//     await participant.save();

//     participant.hint3 = true;
//     await participant.save();

//     return res.status(200).json({ points: participant.points });
//   } catch (error) {
//     console.error("Error updating points:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.post("/updatepoints2", async (req, res) => {
//   const { points, email } = req.body; // Reduce 10 points for hint

//   try {
//     // Find participant by email
//     const participant = await Participant.findOne({ email: email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Ensure points don't go negative
//     const updatedPoints = participant.points - points;

//     // Update points in the database
//     participant.points = updatedPoints;
//     await participant.save();

//     participant.hint3 = false;
//     await participant.save();

//     return res.status(200).json({ points: participant.points });
//   } catch (error) {
//     console.error("Error updating points:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // POST endpoint for verifying output

// app.get("/getsubmittedcode", async (req, res) => {
//   const { email } = req.query; // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const participant = await Participant.findOne({ email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     res.json({ submittedCode: participant.submittedCode });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// app.get("/getpoints", async (req, res) => {
//   const { email, hintnumber } = req.query; // Get email and hintNumber from query parameters

//   if (!email || !hintnumber) {
//     return res
//       .status(400)
//       .json({ message: "Email and hintNumber are required" });
//   }

//   try {
//     const participant = await Participant.findOne({ email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     // Convert hintNumber to an integer and determine points deduction
//     const hintnum = parseInt(hintnumber);
//     if (![1, 2, 3].includes(hintnum)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid hintNumber. Must be 1, 2, or 3." });
//     }

//     // Deduct points based on the hint number
//     const pointsDeduction = hintnum * 10; // 1 → -10, 2 → -20, 3 → -30
//     participant.points -= pointsDeduction;

//     // Ensure points don't go below zero
//     if (participant.points < 0) participant.points = 0;

//     await participant.save();
//     console.log("mydata", participant);

//     res.json({
//       message: "Points updated successfully",
//       points: participant.points,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// app.get("/getsubmissiontime", async (req, res) => {
//   const { email } = req.query; // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const participant = await Participant.findOne({ email });

//     if (!participant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     res.json({ subtime: participant.round1submissiontime });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// app.get("/randomnumber", async (req, res) => {
//   const { email } = req.query;
//   if (!email) {
//     return res.status(400).json({ error: "Email parameter is required" });
//   }

//   try {
//     // Query the database for a participant with the provided email
//     const participant = await Participant.findOne({ email });
//     if (!participant) {
//       return res.status(404).json({ error: "Participant not found" });
//     }
//     // Return the random number from the participant's record
//     return res.json({ randomnum: participant.randomnumber });
//   } catch (error) {
//     console.error("Error fetching participant:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const timeoutPromise = (ms) =>
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("Promise timed out")), ms),
//   );

// const promiseWithTimeout = (promise, ms) =>
//   Promise.race([promise, timeoutPromise(ms)]);

// // POST endpoint for compiling and running code
// app.post("/compile", async (req, res) => {
//   const { language, code, action, input, testcases, email } = req.body;
//   console.log(language);
//   console.log(code);
//   console.log(input);

//   if (action === "run") {
//     if (!language) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Please select the language" });
//     }

//     console.log("Language", language);

//     if (language === "python") {
//       let envData = { OS: "windows" };

//       // Validate if the provided code looks like C code by checking for common C patterns
//       const isLikelyCCode = /#include\s+<.*?>|int\s+main\s*\(/.test(code);

//       if (isLikelyCCode) {
//         return res.status(400).send({
//           status: false,
//           message:
//             "The code appears to be written in C, but Python was selected.",
//         });
//       }

//       try {
//         if (input) {
//           compiler.compilePythonWithInput(envData, code, input, (data) => {
//             if (!data) {
//               return res.status(500).send({
//                 status: false,
//                 message: "No response from compiler",
//               });
//             }
//             if (data.error) {
//               console.error("Compilation Error:", data.error);
//               return res.status(400).send({
//                 status: false,
//                 message: data.error,
//               });
//             }
//             res.send({
//               status: true,
//               output: data.output,
//             });
//             console.log("Output:", data.output);
//           });
//         } else {
//           compiler.compilePython(envData, code, (data) => {
//             if (!data) {
//               return res.status(500).send({
//                 status: false,
//                 message: "No response from compiler",
//               });
//             }
//             if (data.error) {
//               console.error("Compilation Error:", data.error);
//               return res.status(400).send({
//                 status: false,
//                 message: data.error,
//               });
//             }
//             res.send({
//               status: true,
//               data: data,
//             });
//           });
//         }
//       } catch (error) {
//         console.error("Unexpected Error:", error);
//         res.status(500).send({
//           status: false,
//           message: "Internal Server Error",
//         });
//       }
//     } else if (language === "cpp" || language === "c") {
//       // Environment setup for C/C++ compilation
//       let envData = { OS: "windows", cmd: "g++", options: { timeout: 30000 } };

//       // Validate if the provided code looks like Python by checking for common Python patterns
//       const isLikelyPython = /def\s+\w+\(|import\s+\w+|print\s*\(/.test(code);
//       if (isLikelyPython) {
//         return res.status(400).send({
//           status: false,
//           message:
//             "The code appears to be written in Python, but C/C++ was selected. Check your language.",
//         });
//       }

//       try {
//         if (input) {
//           compiler.compileCPPWithInput(envData, code, input, (data) => {
//             if (!data) {
//               return res.status(500).send({
//                 status: false,
//                 message: "No response from compiler",
//               });
//             }
//             if (data.error) {
//               console.error("Compilation Error:", data.error);
//               return res.status(400).send({
//                 status: false,
//                 message: "Compilation failed: " + data.error,
//               });
//             }
//             res.send({
//               status: true,
//               output: data.output || "No output",
//             });
//           });
//         } else {
//           compiler.compileCPP(envData, code, (data) => {
//             if (!data) {
//               return res.status(500).send({
//                 status: false,
//                 message: "No response from compiler",
//               });
//             }
//             if (data.error) {
//               console.error("Compilation Error:", data.error);
//               return res.status(400).send({
//                 status: false,
//                 message: "Compilation failed: " + data.error,
//               });
//             }
//             res.send({
//               status: true,
//               output: data.output || "No output",
//             });
//           });
//         }
//       } catch (error) {
//         console.error("Unexpected Error:", error);
//         res.status(500).send({
//           status: false,
//           message: "Internal Server Error",
//         });
//       }
//     }
//   } else {
//     let failedCases = [];
//     let passedCases = [];
//     let failedCount = 0;
//     let promises = [];

//     if (language === "python") {
//       let envData = {
//         OS: "windows",
//         cmd: "python3",
//         options: { timeout: 10000 },
//       };

//       promises = testcases.map((testcase) => {
//         return promiseWithTimeout(
//           new Promise((resolve) => {
//             compiler.compilePythonWithInput(
//               envData,
//               code,
//               testcase.input,
//               (data) => {
//                 if (data.error) {
//                   // Reject the promise so it can be caught later
//                   return reject(new Error("Execution failed: " + data.error));
//                 }

//                 let compoutput = data.output.toString();

//                 let actualOutput = compoutput.trim();
//                 let expectedOutput = testcase.expectedOutput.trim();

//                 if (actualOutput === expectedOutput) {
//                   passedCases.push({
//                     input: testcase.input,
//                     expected: expectedOutput,
//                     got: actualOutput,
//                   });
//                 } else {
//                   failedCases.push({
//                     input: testcase.input,
//                     expected: expectedOutput,
//                     got: actualOutput,
//                   });
//                   failedCount++;
//                 }
//                 resolve();
//               },
//             );
//           }),
//           30000,
//         );
//       });
//     } else if (language === "cpp" || language === "c") {
//       let envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

//       promises = testcases.map((testcase) => {
//         return promiseWithTimeout(
//           new Promise((resolve) => {
//             compiler.compileCPPWithInput(
//               envData,
//               code,
//               testcase.input,
//               (data) => {
//                 if (data.error) {
//                   // Reject the promise so it can be caught later
//                   return reject(new Error("Execution failed: " + data.error));
//                 }

//                 let compoutput = data.output.toString();

//                 let actualOutput = compoutput.trim();
//                 let expectedOutput = testcase.expectedOutput.trim();

//                 console.log("Actualoutput", actualOutput);
//                 console.log("expected output", expectedOutput);

//                 if (actualOutput === expectedOutput) {
//                   passedCases.push({
//                     input: testcase.input,
//                     expected: expectedOutput,
//                     got: actualOutput,
//                   });
//                 } else {
//                   failedCases.push({
//                     input: testcase.input,
//                     expected: expectedOutput,
//                     got: actualOutput,
//                   });
//                   failedCount++;
//                 }
//                 resolve();
//               },
//             );
//           }),
//           30000,
//         );
//       });
//     }

//     try {
//       await Promise.all(promises);
//     } catch (error) {
//       console.error("Some of the test cases failed:", error);
//       return res.status(400).send({ status: "error", message: error.message });
//     }

//     if (failedCases.length === 0) {
//       console.log("all are passed");
//       console.log("pass", passedCases);

//       console.log("Myemail", currentUserEmail);
//       const participant = await Participant.findOne({ email: email });

//       console.log(code);
//       participant.submittedCode = code;
//       await participant.save();

//       participant.points = 100;
//       await participant.save();

//       participant.language = language;
//       await participant.save();

//       const time = new Intl.DateTimeFormat("en-GB", {
//         timeZone: "Asia/Kolkata",
//         hour12: false,
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       }).format(new Date());

//       participant.round1submissiontime = time; // Store time as a string
//       await participant.save();

//       return res.json({
//         status: "success",
//         message: "✅ All test cases passed!",
//         passedTestCases: passedCases,
//         subtime: time,
//       });
//     } else {
//       console.log("all are transfered");
//       res.send({
//         status: "failed",
//         failedCount: failedCount,
//         passedTestCases: passedCases,
//         failedTestCases: failedCases,
//       });
//     }
//   }
// });

// const port = process.env.PORT || 5000;
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });

// // Clean up temporary files on exit
// process.on("SIGINT", () => {
//   compilex.flush(function () {
//     console.log("Temporary files cleaned up.");
//     process.exit();
//   });
// });
