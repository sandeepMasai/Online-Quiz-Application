import express from "express";
import { getUsers, getUserProfile, deleteUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();

// Profile route → for any logged-in user
router.get("/me", authenticate, getUserProfile);

// Admin/HR only routes
router.get("/", authenticate, authorize(["admin"]), getUsers);
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

export default router;
