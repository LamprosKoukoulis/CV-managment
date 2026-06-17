import query from "../db/query.js";

async function getSkill(skill_id) {
    const exists = await query(
        "SELECT id FROM skills WHERE name = ?",
        [name]
    );

    if (exists.rows.length > 0) {
        return exists.rows[0].id;
    }
}

export async function getAllSkills() {
    const res = await query(`SELECT * FROM skills`);
    return res.rows;
}

export async function getStudentSkill(student_id) {
    const result = await query(`
        SELECT s.id, s.name
        FROM skills s
        JOIN student_skills ss ON ss.skill_id = s.id
        WHERE ss.student_id = ?
    `, [student_id]);

    return result.rows;
}
export async function addSkill(skill_name) {
        const result = await query(`
        INSERT INTO skills (name)
        VALUES (?)
        RETURNING id
    `, [skill_name]);
    return result.rows[0];
}

async function addSkillToStudent(student_id, skill_id) {
    return await query(`
        INSERT OR IGNORE INTO student_skills (
            student_id, skill_id
        ) VALUES (?, ?)
    `, [Number(student_id), Number(skill_id)]);
}
export async function addStudentSkills(student_id, skillIds) {

    // 1. remove all existing
    await query(`
        DELETE FROM student_skills
        WHERE student_id = ?
    `, [student_id]);

    // 2. insert new ones
    for (const skill_id of skillIds) {
        await query(`
            INSERT INTO student_skills (student_id, skill_id)
            VALUES (?, ?)
        `, [
            Number(student_id), 
            Number(skill_id)
        ]);
    }
}

async function removeSkillFromStudent(student_id,skill_id) {
    const result = await query(`
        DELETE FROM student_skills
        WHERE student_id = ? AND skill_id = ?
        RETURNING student_id
        ` , [
            Number(student_id),
            Number(skill_id)
        ]);

    return result.rows[0].student_id || null
}
export async function addStudentSkill(student_id, skill_id) {
    skill_id = await getSkill(skill_id);
    
    await addSkillToStudent(Number(student_id), Number(skill_id));
    
    console.log("skill_id:", skill_id, "skillName:", skillName);
}

export async function deleteStudentSkill(student_id,skill_id) {
    skill_id = await getSkill(skill_id);
    
    await removeSkillFromStudent(Number(student_id), Number(skill_id));

    console.log("<Removed Skill "+skillName+" > "+ student_id);
}