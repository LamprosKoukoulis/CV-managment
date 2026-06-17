import { addSkill, addStudentSkills, getAllSkills } from "../services/skills.service.js";

export async function getAllSkillsController(req, res) {
    try {
        const skills = await getAllSkills();
        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load skills" });
    }
}

export async function addStudentSkillsController(req, res) {
    try {
        const s_id = req.user.student_id;
        const { skillIds } = req.body;
        await addStudentSkills(s_id, skillIds);

        res.json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add keywords" });
    }
}

export async function addSkillsController(req, res) {
    try {
        const { skill } = req.body;
        const skills = skill.split(",");
        let result;
        for (const s of skills) {
            result += await addSkill(s);
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        if (err.message?.includes("UNIQUE constraint failed")) {
            return res.status(409).json({
                error: "This item already exists"
            });
        }
        return res.status(500).json({ error: "Server error" });
    }
}