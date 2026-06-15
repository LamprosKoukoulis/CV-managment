document.getElementById("editCvBtn").addEventListener("click", loadCV);
async function loadCV() {
    const res = await fetch("/cv", { credentials: "include" });
    const cv = await res.json();

    const studentSkillIds = cv.skills.map(k => k.id);
    const studentKeywordIds = cv.keywords.map(k => k.id);

    const allSkillsRes = await fetch("/skills", { credentials: "include" });
    const allSkills = await allSkillsRes.json();

    const allKeywordsRes = await fetch("/keywords", { credentials: "include" });
    const allKeywords = await allKeywordsRes.json();

    renderCVEditor(cv);

    renderSkills(allSkills, studentSkillIds);

    renderKeywords(allKeywords, studentKeywordIds);

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

            <label>Summary</label>
            <textarea name="summary">${cv?.summary || ""}</textarea>

            <label>Education</label>
            <textarea name="education">${cv?.education || ""}</textarea>

            <label>Experience</label>
            <textarea name="experience">${cv?.experience || ""}</textarea>

            <label>Skills</label>
            <div id="skillsTags"></div>
            <select id="skills" multiple>
            </select>

            <label>Keywords</label>
            <div id="keywordsTags"></div>
            <select id="keywords" multiple>
            </select>

            <button id="submit-cv" type="submit">
                Save CV
            </button>

        </form>
    `;

}

function renderSkills(skills, selectedIds) {

    const select = document.getElementById("skills");

    select.innerHTML = skills.map(skill => `
        <option
            value="${skill.id}"
            ${selectedIds.includes(skill.id) ? "selected" : ""}
        >
            ${skill.name}
        </option>
    `).join("");

    updateTags("skillsTags", skills, selectedIds);
}

function renderKeywords(keywords, selectedIds) {

    const select = document.getElementById("keywords");
    select.innerHTML = keywords.map(keyword => `
        <option
            value="${keyword.id}"
            ${selectedIds.includes(keyword.id) ? "selected" : ""}
        >
            ${keyword.name}
        </option>
    `).join("");

    updateTags("keywordsTags", keywords, selectedIds);
}

function updateTags(element, items, selectedIds) {

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

