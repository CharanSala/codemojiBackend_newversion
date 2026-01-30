import Participant from "../models/user.model.js";

function timeToSeconds(time) {
  if (!time) return 0;
  const [hh, mm, ss] = time.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
}

export const leaderboard = async (req, res) => {
  try {
    const participants = await Participant.find(
      {},
      "email round1submissiontime round2submissiontime round3submissiontime points",
    );

    const sortedLeaderboard = participants
      .filter((participant) => participant.points > 0)
      .map((participant) => {
        // Compute seconds for sorting purposes
        const round1Seconds = participant.round1submissiontime
          ? timeToSeconds(participant.round1submissiontime)
          : Infinity;
        const round2Seconds = participant.round2submissiontime
          ? timeToSeconds(participant.round2submissiontime)
          : Infinity;
        const round3Seconds = participant.round3submissiontime
          ? timeToSeconds(participant.round3submissiontime)
          : Infinity;

        // Determine the latest round submitted (round3 > round2 > round1)
        let latestRound = 0;
        if (participant.round3submissiontime) {
          latestRound = 3;
        } else if (participant.round2submissiontime) {
          latestRound = 2;
        } else if (participant.round1submissiontime) {
          latestRound = 1;
        }

        return {
          email: participant.email,
          points: participant.points || 0,
          latestRound,
          // Include seconds properties for internal sorting
          round1Seconds,
          round2Seconds,
          round3Seconds,
          // Pass the original HH:MM:SS strings to the frontend
          round1Time: participant.round1submissiontime || "N/A",
          round2Time: participant.round2submissiontime || "N/A",
          round3Time: participant.round3submissiontime || "N/A",
        };
      })
      .sort((a, b) => {
        // First, sort by points descending
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        // Next, sort by the number of rounds submitted descending
        if (b.latestRound !== a.latestRound) {
          return b.latestRound - a.latestRound;
        }
        // If both points and rounds are equal, sort by the submission time of the latest round (faster submission wins)
        switch (a.latestRound) {
          case 3:
            return a.round3Seconds - b.round3Seconds;
          case 2:
            return a.round2Seconds - b.round2Seconds;
          case 1:
            return a.round1Seconds - b.round1Seconds;
          default:
            return 0;
        }
      })
      // Remove the numeric seconds properties before sending the response
      .map(({ round1Seconds, round2Seconds, round3Seconds, ...rest }) => rest);

    res.json(sortedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
