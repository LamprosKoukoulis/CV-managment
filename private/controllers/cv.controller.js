import { getCV as getCVService, updateCV as updateCVService } from "../services/cv.service.js" ;


export async function getCV(req,res){
    try{
    if (!req.user) {
          return res.json(null);
    }
    let studentId = req.user.student_id;

        // ADMIN override
        if (req.user.role === "admin" && req.query.student_id) {
            studentId = Number(req.query.student_id);
        }

      const cv =await getCVService(studentId);
      console.log(cv);
      
      return res.json(cv);
    } catch (err) {
        res.status(500).json({ error: "Failed to load user cv"});
    }
};

export async function updateCV(req,res){
    try{
        const {
            summary,
            education,
            experience,
            student_id
        } = req.body;
        
        // DEFAULT: normal user can only edit their own CV
        let uId = req.user.student_id;

        // ADMIN OVERRIDE: only admin can target other students
        if (req.user.role === "admin" && student_id) {
            uId = student_id;
        }

        await updateCVService(uId,{summary,education,experience})

        res.json({
            success:true,
            message: "CV updated successfully"
        });
    }catch(err){
        console.error(err);

        res.status(500).json({
            error: "Failed to update CV"
        });
    }
}