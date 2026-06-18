// this is a total mess , if i find time i'll refactor it

const user = {
    me: null,
    students: [],
    currentStudentId: null,
    cv: null,
    skills: [],
    keywords: []
};

document.getElementById("editCvBtn").addEventListener("click", loadCV);

async function loadCV() {
    renderCVEditor();

    await loadMe();
    await maybeLoadStudents();

    await loadAllLookups();
    console.log(user.currentStudentId,user.me.student_id);
    
    await reloadCVForStudent(user.currentStudentId?? user.me.student_id);
}

async function loadMe() {
    const res = await fetch("/auth/me", { credentials: "include" });
    user.me = await res.json();

    console.log("me:", user.me);
}

async function maybeLoadStudents() {
    if (user.me.role !== "admin") return;

    const res = await fetch("/students", { credentials: "include" });
    user.students = await res.json();

    if (user.students.length > 0) {
        user.currentStudentId = user.students[0].student_id;
    }

    renderStudentDropdown();
}

function renderStudentDropdown() {
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

    const selector = document.getElementById("adminStudentSelector");
    // selector.value = user.currentStudentId;
    selector.addEventListener("change", (e) => {
        user.currentStudentId = Number(e.target.value);
        reloadCVForStudent(user.currentStudentId);
    });
}

async function loadAllLookups() {
    const [skillsRes, keywordsRes] = await Promise.all([
        fetch("/skills", { credentials: "include" }),
        fetch("/keywords", { credentials: "include" })
    ]);

    user.skills = await skillsRes.json();
    user.keywords = await keywordsRes.json();
}

async function reloadCVForStudent(studentId = null) {
    console.log("Loading CV for student:", studentId);
    const url = studentId ? `/cv?student_id=${studentId}` : "/cv";

    const res = await fetch(url, { credentials: "include" });
    user.cv = await res.json();

    renderCV(user.cv);
}

function renderCV(cv) {

    const form = document.getElementById("cvForm");
    form.summary.value = cv.summary || null;
    form.experience.value = cv.experience || null;
    form.education.value = cv.education || null;

    const skillIds = cv.skills.map(s => s.id);
    const keywordIds = cv.keywords.map(k => k.id);

    render("skills", "skillsTags", user.skills, skillIds);
    render("keywords", "keywordsTags", user.keywords, keywordIds);

    attachListeners();
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

    container.innerHTML = items.filter(items => selectedIds.includes(items.id))
        .map(items => `<span class="tag">${items.name}</span>`).join("");
}


function attachListeners() {

    const skills = document.getElementById("skills");
    const keywords = document.getElementById("keywords");
    const form = document.getElementById("cvForm");

    skills.onchange = () => {
        const ids = [...skills.selectedOptions].map(o => Number(o.value));
        updateTags("skillsTags", user.skills, ids);
    };

    keywords.onchange = () => {
        const ids = [...keywords.selectedOptions].map(o => Number(o.value));
        updateTags("keywordsTags", user.keywords, ids);
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        saveCV(form);
    };
}

async function saveCV(form) {
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

function setCVMessage(text, type = "info") {
    const el = document.getElementById("cv-main-message");
    if (!el) return;

    el.textContent = text;
    el.className = `cv-message ${type}`;
}

function renderCVEditor(cv = {}) {

    const editor = document.getElementById("cvEditor");

    editor.innerHTML = `
        <form id="cvForm">
        <div class="group">
        <select type="select" id="adminStudentSelector" style="display:none"></select>
        
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
        
        <label id= "cv-main-message" class="cv-message"></label>
        <div class="cv-actions">
        <button id="submit-cv" type="submit">
        Save CV
        </button>
        </div>
        </form>
        `;
    }