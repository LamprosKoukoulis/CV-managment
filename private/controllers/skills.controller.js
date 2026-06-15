import { addStudentSkills, getAllSkills } from "../services/skills.service.js";

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