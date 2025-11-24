import express from "express";
import { submitAssessment, getResult, getUserResults } from "../controllers/result.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Submit answers (student)
router.post("/submit", authenticate, submitAssessment);

// Get all results for logged-in user (MUST BE BEFORE /:id route)
router.get("/user/history", authenticate, getUserResults);

// Get result details (student/admin/hr can view)
router.get("/:id", authenticate, getResult);

export default router;

