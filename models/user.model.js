import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, default: "codemoji", required: true, trim: true },

  hint1: { type: Boolean, default: false },
  hint2: { type: Boolean, default: false },
  hint3: { type: Boolean, default: false },

  round1submissiontime: { type: String, default: null },
  round2submissiontime: { type: String, default: null },
  round3submissiontime: { type: String, default: null },

  submittedCode: { type: String, default: null, trim: true },

  round1starttime: { type: Date, default: null },
  round2starttime: { type: Date, default: null },
  round3starttime: { type: Date, default: null },

  randomnumber: { type: Number, default: 0 },
  value1: { type: Number, default: 0 },
  value2: { type: Number, default: 0 },
  value3: { type: Number, default: 0 },

  language: { type: String, default: null, trim: true },
  output: { type: String, default: "", trim: true },
  points: { type: Number, default: 0 },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
