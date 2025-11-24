import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import assessmentRoutes from "./routes/assessment.routes.js";
import resultRoutes from "./routes/result.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS (Frontend domain)
app.use(cors({
  origin: [
    "https://online-quiz-application-1-un43.onrender.com", // production frontend domain
    "http://localhost:5173", // Vite default port
    "http://localhost:3000", // React default port
  ],
  credentials: true, // if using cookies or auth headers
}));

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Debug request origins
app.use((req, res, next) => {
  console.log(" Incoming request from:", req.headers.origin || "Unknown Origin");
  next();
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send(" Online Quiz Backend running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/results", resultRoutes);

// ✅ 404 and error handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));
