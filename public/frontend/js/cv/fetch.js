import { user } from "./user.js";
import {setCVMessage} from "./extras-ui.js"

export async function loadMe() {
    const res = await fetch("/auth/me", { credentials: "include" });
    user.me = await res.json();
    // console.log("me:", user.me);
}

export async function loadStudents() {
    const res = await fetch("/students", { credentials: "include" });
    user.students = await res.json();
    // console.log(user.students);
    
}

export async function loadLookups() {
    const [skillsRes, keywordsRes] = await Promise.all([
        fetch("/skills", { credentials: "include" }),
        fetch("/keywords", { credentials: "include" })
    ]);

    user.skills = await skillsRes.json();
    user.keywords = await keywordsRes.json();
}

export async function loadCV(studentId) {
    const url = studentId ? `/cv?student_id=${studentId}` : "/cv";

    const res = await fetch(url, { credentials: "include" });
    user.cv = await res.json();
    // console.log("CV loaded:", user.cv);
    return user.cv
}

export async function saveCV(form) {
    try {
        setCVMessage("Saving...", "info");
        const payload = {
            summary: form.summary.value,
            education: form.education.value,
            experience: form.experience.value
        };
        
        const skillIds = [...document.getElementById("skills").selectedOptions].map(o => Number(o.value));
        
        const keywordIds = [...document.getElementById("keywords").selectedOptions].map(o => Number(o.value));
        
        await fetch("/cv", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                ...payload,
                student_id: user.me.role === "admin" ? user.currentStudentId : undefined
            })
        });
        
        await fetch("/skills", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                student_id: user.me.role === "admin" ? user.currentStudentId : undefined,
                skillIds
            })
        });
        
        await fetch("/keywords", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                student_id: user.me.role === "admin" ? user.currentStudentId : undefined,
                keywordIds
            })
        });
        setCVMessage("Saved", "success");
        
        setTimeout(() =>
            setCVMessage(""), 2000);
    } catch (err) {
        setCVMessage("Failed To save CV", "error")
    }
}
