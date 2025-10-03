import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";

import { authenticate } from "../middleware/auth.js";   // verify JWT
import { authorize } from "../middleware/roles.js";     // role-based access

const router = express.Router();


router.post("/", authenticate, authorize(["admin"]), createQuestion);


router.get("/", authenticate, getQuestions);


router.get("/:id", authenticate, getQuestionById);


router.put("/:id", authenticate, authorize(["admin"]), updateQuestion);


router.delete("/:id", authenticate, authorize(["admin"]), deleteQuestion);

export default router;
