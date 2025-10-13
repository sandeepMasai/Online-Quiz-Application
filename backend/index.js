import express from "express";
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

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://online-quiz-application-1-un43.onrender.com",
  "https://ai-powered-interview-mfag.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Assessment Portal Backend is running successfully!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/results", resultRoutes);

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error handler middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server only after DB connection is ready
const startServer = async () => {
  try {
    await connectDB(); // ensure MongoDB connected
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
