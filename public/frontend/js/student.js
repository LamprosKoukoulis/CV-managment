//Deprecated use js/cv.js instead 

document.getElementById("editCvBtn").addEventListener("click", loadCV);
let currentStudentId = null;
async function loadCV() {
    renderCVEditor();
    loadStudentsIfAdmin();
    const url = currentStudentId ? `/cv?student_id=${currentStudentId}` : "/cv";
    const res = await fetch(url, { credentials: "include" });
    const cv = await res.json();

    const studentSkillIds = cv.skills.map(k => k.id);
    const studentKeywordIds = cv.keywords.map(k => k.id);

    const allSkillsRes = await fetch("/skills", { credentials: "include" });
    const allSkills = await allSkillsRes.json();

    const allKeywordsRes = await fetch("/keywords", { credentials: "include" });
    const allKeywords = await allKeywordsRes.json();

    render("skills", "skillsTags", allSkills, studentSkillIds);

    render("keywords", "keywordsTags", allKeywords, studentKeywordIds);

    document.getElementById("skills").addEventListener("change", () => {
        const ids = [...document.getElementById("skills").selectedOptions].map(o => Number(o.value));
        updateTags("skillsTags", allSkills, ids);
    });

    document.getElementById("keywords").addEventListener("change", () => {
        const ids = [...document.getElementById("keywords").selectedOptions].map(o => Number(o.value));
        updateTags("keywordsTags", allKeywords, ids);
    });

    document.getElementById("cvForm").addEventListener("submit", (e) => {
        e.preventDefault();
        saveCV(e.target);
    });
}

function renderCVEditor(cv = {}) {

    const editor = document.getElementById("cvEditor");

    editor.innerHTML = `
        <form id="cvForm">
            <div class="group">
            <select type="select" id="adminStudentSelect" ></select>
            
            </div>

            <section class="cv-main">
            <label>Summary</label>
            <textarea name="summary">${cv?.summary || ""}</textarea>
            
            <label>Education</label>
            <textarea name="education">${cv?.education || ""}</textarea>
            
            <label>Experience</label>
            <textarea name="experience">${cv?.experience || ""}</textarea>
            </section>
            <section class="cv-rest">
            <div class="group">
            <label>Skills</label>
            <div id="skillsTags"></div>
            <select id="skills" class="tags-container" multiple>
            </select>
            </div>
            </div>
            
            <div class="group">
            <label>Keywords</label>
            <div id="keywordsTags"></div>
            <select id="keywords" class="tags-container" multiple>
            </select>
            </div>
            </section>

            <div class="cv-actions">
            <button id="submit-cv" type="submit">
                Save CV
            </button>
            </div>

        </form>
    `;
}

function render(selectId, tagsId, items, selectedIds = []) {

    const select = document.getElementById(selectId);

    select.innerHTML = items.map(item => `
        <option
            value="${item.id}"
            ${selectedIds?.includes(item.id) ? "selected" : ""}
        >
            ${item.name}
        </option>
    `).join("");

    updateTags(tagsId, items, selectedIds);
}

function updateTags(element, items, selectedIds = []) {

    const container = document.getElementById(element);
    // container.innerHTML ="";

    container.innerHTML = items
        .filter(items => selectedIds.includes(items.id))
        .map(items =>
            `<span class="tag">${items.name}</span>`
        )
        .join("");
}

async function saveCV(form) {
    const summary = form.summary.value;
    const education = form.education.value;
    const experience = form.experience.value;

    const skillIds = [...document.getElementById("skills").selectedOptions].map(o => Number(o.value));

    const keywordIds = [...document.getElementById("keywords").selectedOptions].map(o => Number(o.value));

    await fetch("/cv", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            summary,
            education,
            experience
        })
    });

    await fetch("/skills", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            skillIds
        })
    });

    await fetch("/keywords", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            keywordIds
        })
    });
}

async function loadStudentsIfAdmin() {
    const meRes = await fetch("/auth/me", { credentials: "include" });
    const me = await meRes.json();
    
    console.log("me: ",me);
    if (me.role !== "admin") return;

    const res = await fetch("/students", { credentials: "include" });

    const students = await res.json();
    console.log(students);
    
    const container = document.getElementById("adminStudentSelect");

    container.innerHTML = `
        <label>Select student</label>
        <select id="studentSelector">
            ${students.map(s =>
                `<option value="${s.student_id}">
                    ${s.name}
                </option>`
            ).join("")}
        </select>
    `;

    document.getElementById("studentSelector").addEventListener("change", (e) => {
        currentStudentId = Number(e.target.value);
        reloadCVForStudent(currentStudentId);
    });

    // default load first student
    currentStudentId = students[0].student_id;
}
