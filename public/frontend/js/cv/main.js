import { user } from "./user.js";
import { loadMe, loadStudents, loadLookups, loadCV, saveCV } from "./fetch.js";
import { renderCV, renderCVEditor, attachListeners } from "./render.js";
import { renderStudentDropdown } from "./extras-ui.js";

document.getElementById("editCvBtn").addEventListener("click", init);

async function init() {
    
    renderCVEditor();
    
    await loadMe();

    if (user.me.role === "admin") {

        await loadStudents();

        if (user.students.length > 0) {
            user.currentStudentId = user.students[0].student_id;
        }

        renderStudentDropdown();

        user.currentStudentId = user.students[0]?.student_id;
    }

    await loadLookups();

    const cv = await loadCV(user.currentStudentId);

    renderCV(user.cv);
}