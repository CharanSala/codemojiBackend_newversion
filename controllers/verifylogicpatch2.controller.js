import Participant from "../models/user.model.js";

export const verify = async (req, res) => {
  const { inputValues, result, email } = req.body;

  if (!Array.isArray(inputValues) || !Array.isArray(result)) {
    return res.status(400).json({ message: "Invalid input format" });
  }

  // Ensure correctValues is an array of numbers
  const correctValues = result.map(Number);

  // Ensure inputValues is an array of numbers
  const userValues = inputValues.map(Number);

  // Check if the number of inputs is correct
  if (userValues.length !== correctValues.length) {
    return res.status(400).json({ message: "Invalid number of inputs" });
  }

  // Verify if the input values match the correct values
  const isCorrect = userValues.every(
    (value, index) => value === correctValues[index],
  );

  if (isCorrect) {
    const sub = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());

    console.log(sub);

    try {
      // Find participant by ID and update their record with the submitted code
      const participant = await Participant.findOne({ email: email });

      if (!participant) {
        return res.status(404).send({ message: "Participant not found" });
      }

      // Save the code in the 'submittedCode' field of the participant
      participant.round2submissiontime = sub;

      await participant.save();

      participant.points = 50;
      await participant.save();

      res.status(200).send({
        message: "✅ Success! Your output is correct!",
        submissionTime: sub,
        status: true,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error saving code to the database",
        error: error.message,
      });
    }
  } else {
    return res.json({
      message: "❌ Some values are incorrect. Please try again!",
      status: false,
    });
  }
};
