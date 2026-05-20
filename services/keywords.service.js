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

async function addKeywordToStudent(studentId, keywordId) {
    return await query(`
        INSERT OR IGNORE INTO student_keywords (
            student_id, keyword_id
        ) VALUES (?, ?)
    `, [studentId, keywordId]);
}

export async function addStudentKeyword(studentId, keywordName) {
    const keywordId = await getOrCreateKeyword(keywordName);

    await addKeywordToStudent(studentId, keywordId);

    console.log("keywordId:", keywordId, "keywordName:", keywordName);
}