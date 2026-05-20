import query from "../db/query.js";

async function getOrCreateSkill(name) {
    const exists = await query(
        "SELECT id FROM skills WHERE name = ?",
        [name]
    );

    if (exists.rows.length > 0) {
        return exists.rows[0].id;
    }

    const result = await query(`
        INSERT INTO skills (name)
        VALUES (?)
        RETURNING id
    `, [name]);

    return result.rows[0].id;
}

async function addSkillToStudent(studentId, skillId) {
    return await query(`
        INSERT OR IGNORE INTO student_skills (
            student_id, skill_id
        ) VALUES (?, ?)
    `, [studentId, skillId]);
}

export async function addStudentSkill(studentId, skillName) {
    const skillId = await getOrCreateSkill(skillName);

    await addSkillToStudent(studentId, skillId);

    console.log("skillId:", skillId, "skillName:", skillName);
}