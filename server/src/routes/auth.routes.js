import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
  authUSer,
} from "../controllers/auth.controller.js";

import { checkAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.post("/check-auth", checkAuth, authUSer);

router.get("/logout", checkAuth, logoutUser);
router.get("/delete", deleteUser);

export default router;
