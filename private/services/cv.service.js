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

export async function getAllCVs() {
    try {
        const result = await query(`
            SELECT
                cv.id AS cv_id,
                students.id AS student_id,
                students.name,
                students.surname,
                cv.summary,
                cv.experience,
                cv.education
            FROM students
            LEFT JOIN cv ON cv.student_id = students.id
            ORDER BY students.surname, students.name
        `);

        const cvs = [];

        for (const cv of result.rows) {
            const skills = await getStudentSkill(cv.student_id);
            const keywords = await getStudentKeyword(cv.student_id);
            cvs.push({ ...cv, skills, keywords });
        }

        return cvs;
    } catch (err) {
        console.error("getAllCVs error:", err);
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
