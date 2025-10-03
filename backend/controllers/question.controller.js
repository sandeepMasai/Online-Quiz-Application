import Question from "../models/Question.js";


export const createQuestion = async (req, res) => {
  try {
    const { text, options, correctOptionIndex, category, difficulty, tags } = req.body;

    // Validate 4 options
    if (!options || options.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 options are required" });
    }

    // Validate correct option index
    if (correctOptionIndex < 0 || correctOptionIndex > 3) {
      return res.status(400).json({ message: "correctOptionIndex must be between 0 and 3" });
    }

    const question = new Question({
      text,
      options,
      correctOptionIndex,
      category,
      difficulty,
      tags,
      createdBy: req.user.id, // from JWT middleware
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all questions (filter by category/difficulty optional)
 * @route   GET /api/questions
 * @access  Private
 */
export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single question
 * @route   GET /api/questions/:id
 * @access  Private
 */
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update a question (Admin only)
 * @route   PUT /api/questions/:id
 * @access  Admin
 */
export const updateQuestion = async (req, res) => {
  try {
    const { text, options, correctOptionIndex, category, difficulty, tags } = req.body;

    if (options && options.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 options are required" });
    }

    if (correctOptionIndex && (correctOptionIndex < 0 || correctOptionIndex > 3)) {
      return res.status(400).json({ message: "correctOptionIndex must be between 0 and 3" });
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { text, options, correctOptionIndex, category, difficulty, tags },
      { new: true }
    );

    if (!question) return res.status(404).json({ message: "Question not found" });

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a question (Admin only)
 * @route   DELETE /api/questions/:id
 * @access  Admin
 */
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
