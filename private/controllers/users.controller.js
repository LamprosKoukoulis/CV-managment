import * as usersService from "../services/users.service.js";

export async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
}

export async function me(req, res) {
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
      `, [req.user.id]
      );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
}

export async function createUser(req, res) {
  try {
    const {
      email,
      password,
      name,
      surname
    } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    const existing = await query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        error: "Email already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    result = await query(
      `INSERT INTO users(        
        email,
        password)
      VALUES(?,?)
      RETURNING id
      `, [
      email,
      hash,

    ]
    );
    await query(`
      INSERT INTO students(
        user_id
        name,
        surname)
        VALUES(?,?,?)
      `, [
      result.rows[0].id,
      name,
      surname
    ]);

    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}