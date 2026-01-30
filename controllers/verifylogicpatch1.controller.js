const verify1 = async (req, res) => {
  const { inputValues, result } = req.body;

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

    console.log(sub);

    return res.json({
      message: "✅ Success! Your output is correct!",
      submissionTime: sub,
      status: true,
    });
  } else {
    return res.json({
      message: "❌ Some values are incorrect. Please try again!",
      status: false,
    });
  }
};
export default verify1;
