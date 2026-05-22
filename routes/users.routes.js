import express from "express";
import { getAllUsers } from "../controllers/users.controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// (optional) create user
// router.post("/", createUser);

export default router;