import query from "../db/query.js";
import {getStudentSkill} from "./skills.service.js"
import { getStudentKeyword } from "./keywords.service.js";

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

export async function getCV(student_id, verbose =false) {
    try{
        let result = await query(`
                SELECT *
                FROM cv
                WHERE student_id =?
        `, [Number(student_id)]);
        const cv = result.rows[0];
        
        const skills = await getStudentSkill(student_id);
        
        const keywords = await getStudentKeyword(student_id);
        const response ={...cv, skills, keywords}
        if(verbose){
            console.table(response);
        }
        
        return response || null;
    } catch (err) {
        console.error("getCV error:", err);
        throw err;
    }
}

export async function updateCV(student_id, data) {
    const result = await query(`
        INSERT INTO cv (
            student_id,
            summary,
            experience,
            education
        )
        VALUES (?, ?, ?, ?)
        ON CONFLICT(student_id) DO UPDATE SET
            summary = excluded.summary,
            experience = excluded.experience,
            education = excluded.education
        RETURNING id
    `, [
        Number(student_id),
        data.summary,
        data.experience,
        data.education
    ]);

    
    return result.rows[0]?.id || null;
}