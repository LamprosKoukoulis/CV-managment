import { getUserByEmailNPassword } from "./users.service";
import { getStudentByEmailAndPassword } from "./students.service";
import { signToken } from "../utils/jwt";

export async function login(email,password) {
    const user = await getUserByEmailNPassword(email,password);

    if(!user){
        return null;
    }
    else if(user.role === 'student'){
        const student = await getStudentByEmailAndPassword(email,password);

        const token = signToken({
            user_id : student.user_id,
            email   : student.email,
            role    : student.role,
            student_id: student.student_id,
            name    : student.name,
            surname : student.surname,
            degree  : student.degree,
            university: student.university  
        });

        return (student,token);
    }else{
        const token = signToken({
            user_id : user.user_id,
            role: user.role
        })
        return (user, token);
    }


}