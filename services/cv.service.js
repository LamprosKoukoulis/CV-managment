import query from "../db/query.js";

export async function createCV(student_id, data) {
    const result = await query(`
        INSERT INTO cv (student_id, summary, experience, education)
        VALUES (?, ?, ?, ?)
        RETURNING id
    `, [
        student_id, 
        data.summary, 
        data.experience, 
        data.education
    ]);

    
    return result.rows[0].id;
}