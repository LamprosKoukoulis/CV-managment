import { saveCV } from "./fetch.js";
import { user } from "./user.js";
export function renderCV(cv) {
    const form = document.getElementById("cvForm");
    form.summary.value = cv.summary || "";
    form.experience.value = cv.experience || "";
    form.education.value = cv.education || "";

    const skillIds = (cv.skills?? []).map(s => s.id);
    const keywordIds = (cv.keywords?? []).map(k => k.id);
    
    render("skills", "skillsTags", user.skills, skillIds);
    render("keywords", "keywordsTags", user.keywords, keywordIds);
    
    attachListeners();
}

export function attachListeners() {

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

export function render(selectId, tagsId, items, selectedIds = []) {

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

export function updateTags(element, items, selectedIds = []) {
    const container = document.getElementById(element);
    // container.innerHTML ="";
    
    container.innerHTML = items.filter(items => selectedIds.includes(items.id))
    .map(items => `<span class="tag">${items.name}</span>`).join("");
}

export function renderCVEditor(cv = {}) {

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