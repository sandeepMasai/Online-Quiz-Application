
// import Result from "../models/Result.js";
// import Assessment from "../models/Assessment.js";
// import Question from "../models/Question.js";

// export const submitAssessment = async (req, res) => {
//   try {
//     const { assessmentId, answers } = req.body;

//     const assessment = await Assessment.findById(assessmentId).populate("questions");
//     if (!assessment) return res.status(404).json({ message: "Assessment not found" });

//     let correctCount = 0;
//     let attempted = 0;

//     assessment.questions.forEach((q, idx) => {
//       const userAnswer = answers[q._id];
//       if (userAnswer !== undefined) {
//         attempted++;
//         if (userAnswer === q.correctOption) correctCount++;
//       }
//     });

//     const scorePercent = Math.round((correctCount / assessment.questions.length) * 100);

//     const result = new Result({
//       user: req.user.id,
//       assessment: assessmentId,
//       answers,
//       correct: correctCount,
//       attempted,
//       scorePercent,
//       passed: scorePercent >= 75
//     });

//     await result.save();

//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getResult = async (req, res) => {
//   try {
//     const result = await Result.findById(req.params.id).populate("assessment");
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import Result from "../models/Result.js";
import Assessment from "../models/Assessment.js";
import Question from "../models/Question.js";

export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    const assessment = await Assessment.findById(assessmentId).populate("questions");
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    let correctCount = 0;
    let attempted = 0;
    let skipped = 0;

    const totalQuestions = assessment.questions.length;

    // Calculate statistics
    assessment.questions.forEach((q) => {
      const userAnswer = answers[q._id];
      
      if (userAnswer !== undefined && userAnswer !== null) {
        attempted++;
        // Compare with correctOptionIndex from Question model
        if (userAnswer === q.correctOptionIndex) {
          correctCount++;
        }
      } else {
        skipped++;
      }
    });

    const incorrectCount = attempted - correctCount;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    const result = new Result({
      user: req.user.id,
      assessment: assessmentId,
      answers,
      correct: correctCount,
      incorrect: incorrectCount,
      attempted,
      skipped,
      totalQuestions,
      scorePercent,
      passed: scorePercent >= 75
    });

    await result.save();

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("assessment");
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("assessment")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

