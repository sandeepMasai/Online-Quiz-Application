
import express from "express";
import { startAssessment, getAssessment } from "../controllers/assessment.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();
router.post("/start", authenticate, authorize("student"), startAssessment);

router.get("/:id", authenticate, getAssessment);

export default router;
