import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }], 
  correctOptionIndex: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., react, html, css, sql, mongodb, node, dsa
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Question', questionSchema);
