import { loadCV, loadLookups } from "./fetch.js";
import { renderCV } from "./render.js";
import { user } from "./user.js";

export function setCVMessage(text, type = "info") {
    const el = document.getElementById("cv-main-message");
    if (!el) return;

    el.textContent = text;
    el.className = `cv-message ${type}`;
}

export function renderStudentDropdown() {
    const container = document.getElementById("adminStudentSelector");
    container.style.display = "block";
    container.innerHTML = `
        <label>Select student</label>
        <select id="studentSelector">
            ${user.students.map(s => `
                <option value="${s.student_id}">
                    ${s.name} ${s.surname ?? ""}
                </option>
            `).join("")}
        </select>
    `;
    // selector.value = user.currentStudentId;
    container.addEventListener("change", async (e) => {
        user.currentStudentId = Number(e.target.value);
        await loadLookups();
        await loadCV(user.currentStudentId);
        // console.log(user.cv);
        renderCV(user.cv);
    });
}
