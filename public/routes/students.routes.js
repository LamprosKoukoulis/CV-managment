import express from "express";
import { getAllStudents } from "../../private/controllers/students.controller.js";
import { adminMiddleware, authMiddleware } from "../../private/middleware/auth.js";
const router = express.Router();

// GET all users
router.get("/",authMiddleware,adminMiddleware, getAllStudents);

// router.post("/", createUser);

export default router;