import { addStudentSkillsController, getAllSkillsController } from "../../private/controllers/skills.controller.js";
import { authMiddleware, optionalAuth } from "../../private/middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/", optionalAuth, getAllSkillsController);
router.put("/", authMiddleware, addStudentSkillsController);

export default router;