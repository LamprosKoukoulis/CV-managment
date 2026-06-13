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

export async function getCV(student_id, verbose =false) {
    const result = await query(`
            SELECT *
            FROM cv
            WHERE student_id =?
    `, [student_id]);
    
    if(verbose){
        console.table(result.rows);
    }
    
    return result.rows[0];
}

export async function updateCV(student_id, data) {
    const f =[];
    const v = [];
    
    for(const key in data){
        f.push(`${key} = ?`);
        v.push(data[key]);
    }    

    if (f.length === 0){
        throw new Error("No fields to update");
    }
    
    v.push(student_id)
    const result = await query(`
        UPDATE cv
        SET ${f.join(", ")}
        WHERE student_id = ?
        RETURNING id
    `, v);

    
    return result.rows[0]?.id || null;
}