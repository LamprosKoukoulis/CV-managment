import query from "../db/query.js";

export async function createUser(email, password, role ="student") { 
    const result = await query(`
        INSERT INTO users (email, password, role)
        VALUES(?,?,?)
        RETURNING id`
        , [email,password,role]);

    return result.rows[0].id;
}

export async function getUserByEmailNPassword(email, password) {
        const result = await query(`
            SELECT id
            FROM users
            WHERE( email = ? AND password = ?)
            `,[email,password]);
        
        console.log("User logged in");
        return result.rows[0]?.id;

}