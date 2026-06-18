import { addKeyword, addStudentKeywords, getAllKeywords } from "../services/keywords.service.js";

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
        let studentId = req.user.student_id;

        // ADMIN override
        if (req.user.role === "admin" && req.body.student_id) {
            studentId = Number(req.body.student_id);
        }

        const { keywordIds } = req.body;
        await addStudentKeywords(studentId, keywordIds);
        res.json({success: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add keywords" });
    }
}
export async function addKeywordController(req, res) {
    try {
        const { keyword } = req.body;
        const keywords = keyword.split(",");
        let result;
        for (const k of keywords) {
            result += await addKeyword(k);
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        if (err.message?.includes("UNIQUE constraint failed")) {
            return res.status(409).json({
                error: "This item already exists"
            });
        }
        return res.status(500).json({ error: "Server error" });
    }
}