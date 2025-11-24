import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  answers: { type: mongoose.Schema.Types.Mixed, required: true }, // Store as object: { questionId: selectedIndex }
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  attempted: { type: Number, default: 0 },
  skipped: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  scorePercent: { type: Number, default: 0 },
  passed: { type: Boolean, default: false },
  startedAt: Date,
  endedAt: Date,
  media: { cameraUrl: String, micUrl: String, screenShareUrls: [String] },
  ip: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Result', resultSchema);