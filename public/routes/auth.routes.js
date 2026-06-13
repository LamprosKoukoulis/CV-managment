import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import query from "../../private/db/query.js"
import { authMiddleware,adminMiddleware } from "../../private/middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      surname,
      degree,
      university
    } = req.body;

    if (!email || !password || !full_name) {
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
      VALUES(?,?,?,?)
      RETURNING id
      `,[
        email,
        password,
        
      ]
    );
    await query(`
      INSERT INTO students(
        user_id
        name,
        surname,
        degree,
        university)
        VALUES(?,?,?,?)
        `,[
          result.rows[0],
          name,
          surname,
          degree,
          university
        ]);

    res.status(201).json({
      message: "User created"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await query(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  const u = user.rows[0];
  console.log(u);
  
  if (!u) return res.status(401).json({ error: "Invalid email" });

  const valid = await bcrypt.compare(password, u.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: u.id, 
      role: u.role,
    },
    process.env.JWT_SECRET
  );

    res.cookie("token", token, {
    httpOnly: true,
    secure: false, // TODO: true (https)
    sameSite: "lax",
    maxAge: 360 * 24 * 60 * 60 * 1000, // 1 χρόνο
  });
  // console.log("LOGIN COOKIE SET");
  res.json({ token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/me", authMiddleware, async (req,res)=>{
    const user =
      await query(`
        SELECT
          u.id,
          u.email,
          u.role,
          s.name,
          s.surname,
          s.degree,
          s.university
        FROM users u
        LEFT JOIN students s
          ON s.user_id = u.id
        WHERE u.id = ?
    `,[req.user.id]
      );
    
    res.json(user.rows[0]);
  }
);

// router.get("/admin/panel", authMiddleware, adminMiddleware, (req, res) => {
//         res.redirect("/admin.html");
//     }
// );

export default router;