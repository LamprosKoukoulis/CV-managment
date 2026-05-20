import {createUser, getUserByEmailNPassword} from "./services/users.service.js";
import {createStudent, getStudentByEmailAndPassword} from "./services/students.service.js";
import {addStudentKeyword} from "./services/keywords.service.js";
import {addStudentSkill} from "./services/skills.service.js";
import { createCV } from "./services/cv.service.js";

//node run run.js

// Create User 
const userId = await createUser("test@email.com", "123456");

// Create Student using user_id
const studentId = await createStudent(userId, {
    name: "John",
    surname: "Javascripts",
    degree: "Informatics",
    university: "University Of Piraeus"
});

// Add skills based on student_id
await addStudentSkill(student.student_id, "Java");
await addStudentSkill(student.student_id, "Node.js");

// Add keywords based on student_id
await addStudentKeyword(student.student_id, "backend");

// Create CV based on student_id
await createCV(student.student_id, {
    summary: "Backend developer",
    experience: "Node.js 🐐",
    education: "Bachelor In Informatics"
});

// Login using email and pass
const student = await getStudentByEmailAndPassword("test@email.com", "123456");
console.log("Student : "+student);
