import {createUser, getUserByEmailNPassword} from "./services/users.service.js";
import {createStudent, getStudentByEmailAndPassword} from "./services/students.service.js";
import {addStudentKeyword, deleteStudentKeyword} from "./services/keywords.service.js";
import {addStudentSkill, deleteStudentSkill} from "./services/skills.service.js";
import { createCV, deleteCV, getCV, updateCV } from "./services/cv.service.js";
import { json } from "express";

// //node run run.js

// Create User 
// const userId = await createUser("admin@email.com", "123456","admin");

// Create Student using user_id
// const studentId = await createStudent(userId, {
//     name: "John",
//     surname: "Javascripts",
//     degree: "Informatics",
//     university: "University Of Piraeus"
// });

// Login using email and pass
const student = await getStudentByEmailAndPassword("test@email.com", "123456");
console.log("Student : "+student);

// // Add skills based on student_id
// await addStudentSkill(student.student_id, "Java");
// await addStudentSkill(student.student_id, "Node.js");

// // Add keywords based on student_id
// await addStudentKeyword(student.student_id, "backend");

// // Create CV based on student_id
// await createCV(student.student_id, {
//     summary: "Backend developer",
//     experience: "Node.js 🐐",
//     education: "Bachelor In Informatics"
// });
await updateCV(student.student_id, {
    summary:"From a small city, ready to code",
});
await getCV(student.student_id);
// //  Delete Skill from Student
// deleteStudentSkill(student.student_id,"Java");

// //  Delete Keyword From Student
// deleteStudentKeyword(student.student_id,"backend");

// //  Delete CV from Student
// deleteCV(student.student_id);
