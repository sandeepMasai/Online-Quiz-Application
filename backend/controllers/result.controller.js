import Result from "../models/Result.js";
import Assessment from "../models/Assessment.js";
import Question from "../models/Question.js";
import mongoose from "mongoose";

export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    // Validate required fields
    if (!assessmentId) {
      return res.status(400).json({ message: "Assessment ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(assessmentId)) {
      return res.status(400).json({ message: "Invalid assessment ID format" });
    }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: "Answers must be an object" });
    }

    const assessment = await Assessment.findById(assessmentId).populate("questions");
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    let correctCount = 0;
    let attempted = 0;
    let skipped = 0;

    const totalQuestions = assessment.questions.length;

    if (totalQuestions === 0) {
      return res.status(400).json({ message: "Assessment has no questions" });
    }

    // Calculate statistics
    assessment.questions.forEach((q) => {
      // Convert ObjectId to string for lookup (answers object uses string keys)
      const questionIdStr = q._id.toString();
      const userAnswer = answers[questionIdStr] !== undefined ? answers[questionIdStr] : answers[q._id];

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
      passed: scorePercent >= 75,
      endedAt: new Date()
    });

    await result.save();

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid result ID format" });
    }

    const result = await Result.findById(req.params.id).populate("assessment");
    if (!result) return res.status(404).json({ message: "Result not found" });
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
