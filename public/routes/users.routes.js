import express from "express";
import { getAllUsers } from "../../private/controllers/users.controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// router.post("/", createUser);

export default router;