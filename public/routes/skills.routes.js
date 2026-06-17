import { addSkillsController, addStudentSkillsController, getAllSkillsController } from "../../private/controllers/skills.controller.js";
import { adminMiddleware, authMiddleware, optionalAuth } from "../../private/middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/", optionalAuth, getAllSkillsController);
router.put("/", authMiddleware, addStudentSkillsController);
router.post("/", authMiddleware,adminMiddleware, addSkillsController);

export default router;