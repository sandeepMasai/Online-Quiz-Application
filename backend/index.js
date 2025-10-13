import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Import your routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import assessmentRoutes from "./routes/assessment.routes.js";
import resultRoutes from "./routes/result.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed Origins (Frontend URLs)
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "https://online-quiz-application-1-un43.onrender.com", // Your frontend (Render)
  "https://ai-powered-interview-mfag.onrender.com", // Optional (secondary)
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ✅ Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Debug — log incoming origin
app.use((req, res, next) => {
  console.log("🌍 Request Origin:", req.headers.origin);
  next();
});

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Online Quiz Backend running successfully!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/results", resultRoutes);

// ✅ 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
