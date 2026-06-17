import { getAllUsers, getUserByEmailNPassword} from "./private/services/users.service.js";
import { getStudentByEmailAndPassword} from "./private/services/students.service.js";
import { deleteStudentKeyword, getAllKeywords} from "./private/services/keywords.service.js";
import {addStudentSkill, deleteStudentSkill, getAllSkills} from "./private/services/skills.service.js";
import { createCV, deleteCV, getCV, updateCV } from "./private/services/cv.service.js";
import bcrypt from "bcrypt";
// import { json } from "express";
// import { login } from "./private/services/auth.service.js";

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
const keywords = await getAllKeywords();
console.table(keywords);

const skills = await getAllSkills();
console.table(skills);

const users = await getAllUsers();
console.table(users[2].email);

// const cv = await getCV(student.id);
// console.log(cv);
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
// await updateCV(student.student_id, {
//     summary:"From a small city, ready to code",
// });
// await getCV(student.student_id,true);
// //  Delete Skill from Student
// deleteStudentSkill(student.student_id,"Java");

// //  Delete Keyword From Student
// deleteStudentKeyword(student.student_id,"backend");

// //  Delete CV from Student
// deleteCV(student.student_id);
