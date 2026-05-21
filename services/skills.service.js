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

async function addSkillToStudent(student_id, skill_id) {
    return await query(`
        INSERT OR IGNORE INTO student_skills (
            student_id, skill_id
        ) VALUES (?, ?)
    `, [student_id, skill_id]);
}

async function removeSkillFromStudent(student_id,skill_id) {
    const result = await query(`
        DELETE FROM student_skills
        WHERE student_id = ? AND skill_id = ?
        RETURNING student_id
        ` , [student_id,skill_id]);

    return result.rows[0].student_id || null
}
export async function addStudentSkill(student_id, skillName) {
    const skill_id = await getOrCreateSkill(skillName);
    
    await addSkillToStudent(student_id, skill_id);
    
    console.log("skill_id:", skill_id, "skillName:", skillName);
}

export async function deleteStudentSkill(student_id,skillName) {
    const skill_id = await getOrCreateSkill(skillName);
    
    await removeSkillFromStudent(student_id, skill_id)

    console.log("<Removed Skill "+skillName+" > "+ student_id);
}