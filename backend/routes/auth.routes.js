// routes/auth.routes.js
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;


// // routes/auth.routes.js
// import express from "express";
// import { register, login } from "../controllers/auth.controller.js";
// import { authenticate} from "../middleware/auth.js";

// const router = express.Router();

// // Register new user
// router.post("/register", register);

// // Login user
// router.post("/login", login);

// // Logout user (clear cookie)
// router.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });
//   res.json({ message: "Logged out successfully" });
// });

// // Get current user details
// router.get("/me", authenticate, (req, res) => {
//   res.json({
//     id: req.user.id,
//     role: req.user.role,
//     username: req.user.username,
//   });
// });

// export default router;
