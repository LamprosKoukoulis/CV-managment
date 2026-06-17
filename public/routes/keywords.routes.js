import { addKeywordController, addStudentKeywordController, getAllKeywordsController } from "../../private/controllers/keywords.controller.js";
import { adminMiddleware, authMiddleware, optionalAuth } from "../../private/middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/", optionalAuth, getAllKeywordsController);
router.put("/", authMiddleware, addStudentKeywordController);
router.post("/",authMiddleware,adminMiddleware,addKeywordController);

export default router;