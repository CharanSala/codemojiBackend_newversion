import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const uri = process.env.MONGO_URI; // ✅ Use environment variable

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if connection fails
    }
};

connectDB();

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String,  default: "codemoji", required: true, trim: true },
    hint1: { type: Boolean, default: true },
    hint2: { type: Boolean, default: false },
    hint3: { type: Boolean, default: false },
    round1submissiontime: { type: String, default: null },
    round2submissiontime: { type: String, default: null },
    round3submissiontime: { type: String, default: null },
    submittedCode: { type: String, default: null, trim: true },
    randomnumber: { type: Number, default: 0 },
    value1: { type: Number, default: 0 },
    value2: { type: Number, default: 0 },
    value3: { type: Number, default: 0 },
    language: { type: String, default: null, trim: true },
    output: { type: String, default: "", trim: true },
    points: { type: Number, default: 0 }
});

const Participant = mongoose.model('Participant', participantSchema);

const insertParticipant = async () => {
    try {
        const newParticipant = new Participant({
            name: "unknown",
            email: "unknown@gmail.com",
            password: "unknown"
        });

        const savedParticipant = await newParticipant.save();
        console.log("Inserted Successfully:", savedParticipant);
    } catch (error) {
        console.error("Error inserting participant:", error);
    } finally {
        mongoose.connection.close();
    }
};

export default Participant;
