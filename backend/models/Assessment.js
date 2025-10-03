
import mongoose from'mongoose';
const assessmentSchema = new mongoose.Schema({
  title: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  totalQuestions: Number,
  durationMinutes: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  allowBackNavigation: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Assessment', assessmentSchema);
