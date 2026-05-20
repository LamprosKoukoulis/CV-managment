import {createUser, getUserByEmailNPassword} from "./services/users.service.js";
import {createStudent, getStudentByEmailAndPassword} from "./services/students.service.js";
import {addStudentKeyword} from "./services/keywords.service.js";
import {addStudentSkill} from "./services/skills.service.js";

const student = await getStudentByEmailAndPassword("test@email.com", "123456");
// console.log("Student : "+student);
// const userId = await createUser("test@email.com", "123456");
// const studentId = await createStudent(7, {
//     name:"John",
//     surname:"Javascripts",
//     degree:"Informatics",
//     university:"University Of Piraeus"
// });

await addStudentSkill(student.studentId, "Java");
await addStudentSkill(student.studentId, "Node.js");

await addStudentKeyword(student.studentId, "backend");