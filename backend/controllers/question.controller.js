import Question from "../models/Question.js";
import mongoose from "mongoose";


export const createQuestion = async (req, res) => {
  try {
    const { text, options, correctOptionIndex, category, difficulty, tags } = req.body;

    // Validate required fields
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Question text is required" });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Validate 4 options
    if (!options || options.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 options are required" });
    }

    // Validate that all options have content
    if (options.some(opt => !opt || !opt.trim())) {
      return res.status(400).json({ message: "All options must have content" });
    }

    // Validate correct option index
    if (correctOptionIndex === undefined || correctOptionIndex === null) {
      return res.status(400).json({ message: "correctOptionIndex is required" });
    }

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid question ID format" });
    }

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid question ID format" });
    }

    const { text, options, correctOptionIndex, category, difficulty, tags } = req.body;

    // Validate text if provided
    if (text !== undefined && (!text || !text.trim())) {
      return res.status(400).json({ message: "Question text cannot be empty" });
    }

    // Validate category if provided
    if (category !== undefined && (!category || !category.trim())) {
      return res.status(400).json({ message: "Category cannot be empty" });
    }

    if (options && options.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 options are required" });
    }

    // Validate that all options have content if options are provided
    if (options && options.some(opt => !opt || !opt.trim())) {
      return res.status(400).json({ message: "All options must have content" });
    }

    if (correctOptionIndex !== undefined && correctOptionIndex !== null) {
      if (correctOptionIndex < 0 || correctOptionIndex > 3) {
        return res.status(400).json({ message: "correctOptionIndex must be between 0 and 3" });
      }
    }

    // Build update object with only provided fields
    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (options !== undefined) updateData.options = options;
    if (correctOptionIndex !== undefined) updateData.correctOptionIndex = correctOptionIndex;
    if (category !== undefined) updateData.category = category;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (tags !== undefined) updateData.tags = tags;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid question ID format" });
    }

    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
