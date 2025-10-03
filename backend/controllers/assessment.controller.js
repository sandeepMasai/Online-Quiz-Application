
import Assessment from "../models/Assessment.js";
import Question from "../models/Question.js";

export const startAssessment = async (req, res) => {
  try {
    const { category, numQuestions, duration } = req.body;

    const questions = await Question.aggregate([{ $match: { category } }, { $sample: { size: numQuestions } }]);

    const assessment = new Assessment({
      user: req.user.id,
      questions: questions.map(q => q._id),
      duration,
      startTime: new Date()
    });

    await assessment.save();
    res.status(201).json({ assessmentId: assessment._id, questions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id).populate("questions");
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
