import * as usersService from "../services/users.service.js";

export async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
}