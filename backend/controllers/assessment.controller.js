import Assessment from "../models/Assessment.js";
import Question from "../models/Question.js";
import mongoose from "mongoose";

export const startAssessment = async (req, res) => {
  try {
    const { category, numQuestions, durationMinutes } = req.body;

    // Validate required fields
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!numQuestions || typeof numQuestions !== 'number' || numQuestions <= 0) {
      return res.status(400).json({ message: "numQuestions must be a positive number" });
    }

    const questions = await Question.aggregate([{ $match: { category } }, { $sample: { size: numQuestions } }]);

    if (questions.length === 0) {
      return res.status(400).json({ message: "No questions found for this category" });
    }

    const assessment = new Assessment({
      title: `${category} Assessment`,
      questions: questions.map(q => q._id),
      totalQuestions: questions.length,
      durationMinutes: durationMinutes || 30,
      createdBy: req.user.id,
      createdAt: new Date()
    });

    await assessment.save();
    res.status(201).json({ assessmentId: assessment._id, questions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssessment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid assessment ID format" });
    }

    const assessment = await Assessment.findById(req.params.id).populate("questions");
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
