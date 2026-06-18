import query from "../db/query.js";

export async function createStudent(userId, data) {
    const result = await query(`
        INSERT INTO students (user_id, name, surname)
        VALUES (?, ?, ?, ?, ?)
        RETURNING user_id
    `, [
        userId,
        data.name,
        data.surname
    ]);

    return result.rows[0].id;
}

export async function getStudentByEmailAndPassword(email, password) {
    const result = await query(`
        SELECT 
            u.id AS user_id,
            u.email,
            u.role,
            s.id AS student_id,
            s.name,
            s.surname
        FROM users u
        JOIN students s ON u.id = s.user_id
        WHERE u.email = ? AND u.password = ? AND u.role= 'student'
    `, [email, password]);

    // console.log(result);
    return result.rows[0];
}

export async function getAllStudentsService() {
    const result = await query(`SELECT             
            id AS student_id,           
            user_id,
            name,
            surname
            FROM students`)

    return result.rows;
}