import axios from "axios";
import dotenv from "dotenv";
import Participant from "../models/user.model.js";

dotenv.config();

/* ================= LANGUAGE MAP ================= */
const LANGUAGE_MAP = {
  python: { language: "python3", versionIndex: "4" },
  c: { language: "c", versionIndex: "5" },
  cpp: { language: "cpp17", versionIndex: "1" },
};

/* ================= JDoodle EXECUTOR ================= */
const executeJDoodle = async (language, code, input = "") => {
  const langConfig = LANGUAGE_MAP[language];

  const response = await axios.post("https://api.jdoodle.com/v1/execute", {
    clientId: process.env.JDOODLE_CLIENT_ID,
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    script: code,
    stdin: input,
    language: langConfig.language,
    versionIndex: langConfig.versionIndex,
  });

  return response.data;
};

/* ================= COMPILE CONTROLLER ================= */
export const compileCode = async (req, res) => {
  const { language, code, input, action, testcases, email } = req.body;

  if (!LANGUAGE_MAP[language]) {
    return res.status(400).json({
      status: false,
      message: "Unsupported language selected",
    });
  }

  /* ============ RUN MODE ============ */
  if (action === "run") {
    try {
      const result = await executeJDoodle(language, code, input || "");

      if (result.error) {
        return res.status(400).json({
          status: false,
          message: result.error,
        });
      }

      return res.json({
        status: true,
        output: result.output || "",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Execution failed",
      });
    }
  }

  /* ============ SUBMIT MODE ============ */
  let passedCases = [];
  let failedCases = [];

  try {
    for (const tc of testcases) {
      const result = await executeJDoodle(language, code, tc.input);

      const actual = (result.output || "").trim();
      const expected = tc.expectedOutput.trim();

      if (actual === expected) {
        passedCases.push({
          input: tc.input,
          expected,
          got: actual,
        });
      } else {
        failedCases.push({
          input: tc.input,
          expected,
          got: actual,
        });
      }
    }

    /* ===== ALL PASSED ===== */
    if (failedCases.length === 0) {
      const participant = await Participant.findOne({ email });

      if (participant) {
        participant.submittedCode = code;
        participant.language = language;
        participant.points = 100;
        participant.round1submissiontime = new Date().toLocaleTimeString(
          "en-IN",
        );

        await participant.save();
      }

      return res.json({
        status: "success",
        message: "✅ All test cases passed!",
        passedTestCases: passedCases,
      });
    }

    /* ===== SOME FAILED ===== */
    return res.json({
      status: "failed",
      failedCount: failedCases.length,
      passedTestCases: passedCases,
      failedTestCases: failedCases,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Error while evaluating test cases",
    });
  }
};
