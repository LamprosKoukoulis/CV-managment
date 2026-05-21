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

export async function deleteCV(student_id) {
    const result = await query(`
        DELETE FROM cv
        WHERE student_id =?
        RETURNING id
        `, [student_id]);
    

    console.log("< REMOVED CV > "+student_id);
    
    return result.rows[0]?.id || null;
}