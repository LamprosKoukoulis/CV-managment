import * as usersService from "../services/users.service.js";

export async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
}

export async function me(req,res) {
  try {
    const user =
      await query(`
        SELECT
          id,
          email,
          full_name,
          semester,
          role
        FROM users
        WHERE id = ?
      `,[req.user.id]
    );
  
  res.json(user.rows[0]);
    } catch (err) {
  res.status(500).json({ error: "Failed to load users" });
  }
}