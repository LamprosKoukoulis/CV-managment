import { user } from "./user.js";
import { loadStudents, loadLookups, loadCV, saveCV } from "./fetch.js";
import { renderCV, renderCVEditor, attachListeners } from "./render.js";
import { renderStudentDropdown } from "./extras-ui.js";
import { getMe } from "../auth.js";

init();
document.addEventListener("dashboard:ready", init);

async function init() {
    const cvSection = document.getElementById("cv");

    if (!cvSection || cvSection.style.display === "none") {
        return;
    }

    renderCVEditor();

    user.me = await getMe();

    if (user.me.role === "admin") {

        await loadStudents();

        if (user.students.length > 0) {
            user.currentStudentId = user.students[0].student_id;
        }

        renderStudentDropdown();

        user.currentStudentId = user.students[0]?.student_id;
    }

    await loadLookups();

    await loadCV(user.currentStudentId);

    renderCV(user.cv);
}
