import query from "../db/query.js";

async function getOrCreateKeyword(name) {
    const exists = await query(
        "SELECT id FROM keywords WHERE name = ?",
        [name]
    );

    if (exists.rows.length > 0) {
        return exists.rows[0].id;
    }

    const result = await query(`
        INSERT INTO keywords (name)
        VALUES (?)
        RETURNING id
    `, [name]);

    return result.rows[0].id;
}

async function addKeywordToStudent(student_id, keyword_id) {
    return await query(`
        INSERT OR IGNORE INTO student_keywords (
            student_id, keyword_id
        ) VALUES (?, ?)
    `, [student_id, keyword_id]);
}

async function removeKeywordFromStudent(student_id,keyword_id) {
    const result = await query(`
        DELETE FROM student_keywords
        WHERE student_id = ? AND keyword_id = ?
        RETURNING student_id
        `,[student_id, keyword_id]);
    return result.rows[0]?.student_id || null;
}

export async function addStudentKeyword(student_id, keywordName) {
    const keyword_id = await getOrCreateKeyword(keywordName);
    
    await addKeywordToStudent(student_id, keyword_id);
    
    console.log("keywordId:", keyword_id, "keywordName:", keywordName);
}

export async function deleteStudentKeyword(student_id,keywordName) {
    const keyword_id = await getOrCreateKeyword(keywordName);
    
    await removeKeywordFromStudent(student_id,keyword_id);
    console.log("<Removed Keyword "+keywordName+" > "+ student_id);
}