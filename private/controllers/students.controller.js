import { getAllStudentsService } from "../services/students.service.js";

export async function getAllStudents(req,res) {
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({error: "Forbidden"})
        }
        const students = await getAllStudentsService();
        return res.json(students);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch students"});
    }
}