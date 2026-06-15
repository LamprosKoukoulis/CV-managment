import express from "express";
import { getCV } from "../../private/controllers/cv.controller.js";
import { authMiddleware, optionalAuth } from "../../private/middleware/auth.js";
import { updateCV } from "../../private/controllers/cv.controller.js";

const router = express.Router();

router.get("/", optionalAuth, getCV);
router.put("/", authMiddleware, updateCV);

export default router;