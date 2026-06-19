import { getMe } from "./auth.js";

let publicCVs = [];
let publicKeywords = [];

async function loadUser() {
    const browseSection = document.getElementById("browseCv");
    const cvSection = document.getElementById("cv");
    const adminSection = document.getElementById("admin");

    browseSection.style.display = "none";
    cvSection.style.display = "none";
    adminSection.style.display = "none";

    const user = await getMe();

    if (!user) {
        browseSection.style.display = "block";
        await loadPublicCVs();
        return;
    }

    cvSection.style.display = "block";

    if (user.role === "admin") {
        adminSection.style.display = "block";
    }

    document.dispatchEvent(new CustomEvent("dashboard:ready", {
        detail: { user }
    }));
}

async function loadPublicCVs() {
    const list = document.getElementById("publicCvList");
    const filters = document.getElementById("publicCvFilters");
    list.innerHTML = "Loading CVs...";
    filters.innerHTML = "";

    try {
        const [cvRes, keywordRes] = await Promise.all([
            fetch("/cv", { credentials: "include" }),
            fetch("/keywords", { credentials: "include" })
        ]);

        publicCVs = await cvRes.json();
        publicKeywords = await keywordRes.json();

        if (!Array.isArray(publicCVs) || publicCVs.length === 0) {
            list.innerHTML = "<p>No CVs found.</p>";
            return;
        }

        renderKeywordFilter();
        renderPublicCVs();
    } catch (err) {
        console.error(err);
        list.innerHTML = "<p>Failed to load CVs.</p>";
    }
}

function renderKeywordFilter() {
    const filters = document.getElementById("publicCvFilters");

    if (!Array.isArray(publicKeywords) || publicKeywords.length === 0) {
        return;
    }

    filters.innerHTML = `
        <label for="keywordFilter">Filter by keyword</label>
        <select id="keywordFilter">
            <option value="">All keywords</option>
            ${publicKeywords.map(keyword => `
                <option value="${keyword.id}">${escapeHtml(keyword.name)}</option>
            `).join("")}
        </select>
    `;

    document.getElementById("keywordFilter").addEventListener("change", renderPublicCVs);
}

function renderPublicCVs() {
    const list = document.getElementById("publicCvList");
    const selectedKeywordId = Number(document.getElementById("keywordFilter")?.value || 0);
    const cvs = selectedKeywordId
        ? publicCVs.filter(cv => (cv.keywords ?? []).some(keyword => keyword.id === selectedKeywordId))
        : publicCVs;

    if (cvs.length === 0) {
        list.innerHTML = "<p>No CVs match this keyword.</p>";
        return;
    }

    list.innerHTML = cvs.map(cv => `
        <article class="card cv-preview">
            <h3>${escapeHtml(cv.name ?? "")} ${escapeHtml(cv.surname ?? "")}</h3>
            <p>${escapeHtml(cv.summary || "No summary available.")}</p>
            ${renderTags("Skills", cv.skills)}
            ${renderTags("Keywords", cv.keywords)}
            <div class="cv-email"><button> 
            <a href="mailto:${escapeHtml(cv.email ?? "")}">
                Contact Candidate
            </a></button></div>
        </article>
    `).join("");
}

function renderTags(label, items = []) {
    if (!items.length) return "";

    return `
        <div class="cv-preview-tags">
            <strong>${label}:</strong>
            ${items.map(item => `<span class="tag">${escapeHtml(item.name)}</span>`).join("")}
        </div>
    `;
}

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadUser();
