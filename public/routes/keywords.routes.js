import { addStudentKeywordController, getAllKeywordsController } from "../../private/controllers/keywords.controller.js";
import { authMiddleware, optionalAuth } from "../../private/middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/", optionalAuth, getAllKeywordsController);
router.put("/", authMiddleware, addStudentKeywordController);

export default router;