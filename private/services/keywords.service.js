import query from "../db/query.js";

async function getKeyword(keyword_id) {
    const exists = await query(
        "SELECT id FROM keywords WHERE id = ?",
        [keyword_id]
    );

    if (exists.rows.length > 0) {
        return exists.rows[0].id;
    }
}

export async function getAllKeywords() {
    const res = await query(`SELECT * FROM keywords`);
    return res.rows;
}

export async function getStudentKeyword(student_id) {
    const result = await query(`
        SELECT s.id, s.name
        FROM keywords s
        JOIN student_keywords ss ON ss.keyword_id = s.id
        WHERE ss.student_id = ?
    `, [Number(student_id)]);

    return result.rows;
}

async function addKeywordToStudent(student_id, keyword_id) {
    return await query(`
        INSERT OR IGNORE INTO student_keywords (
            student_id, keyword_id
        ) VALUES (?, ?)
    `, [Number(student_id), Number(keyword_id)]);
}

async function removeKeywordFromStudent(student_id, keyword_id) {
    const result = await query(`
        DELETE FROM student_keywords
        WHERE student_id = ? AND keyword_id = ?
        RETURNING student_id
        `, [student_id, keyword_id]);
    return result.rows[0]?.student_id || null;
}

export async function addStudentKeywords(student_id, keywordIds) {

    // 1. remove all existing
    await query(`
        DELETE FROM student_keywords
        WHERE student_id = ?
    `, [Number(student_id)]);

    // 2. insert new ones
    for (const keyword_id of keywordIds) {
        await query(`
            INSERT INTO student_keywords (student_id, keyword_id)
            VALUES (?, ?)
        `, [Number(student_id), Number(keyword_id)]);
    }
}

export async function deleteStudentKeyword(student_id, keyword_id) {
    keyword_id = await getKeyword(keyword_id);

    await removeKeywordFromStudent(student_id, keyword_id);
    console.log("<Removed Keyword " + keyword_id + " > " + student_id);
}