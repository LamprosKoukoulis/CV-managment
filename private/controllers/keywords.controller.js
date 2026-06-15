import { addStudentKeywords, getAllKeywords } from "../services/keywords.service.js";

export async function getAllKeywordsController(req, res) {
    try {
        const keywords = await getAllKeywords();
        res.json(keywords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load keywords" });
    }
}

export async function addStudentKeywordController(req, res) {
    try {
        const s_id = req.user.student_id;
        const { keywordIds } = req.body;
        await addStudentKeywords(s_id, keywordIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add keywords" });
    }
}