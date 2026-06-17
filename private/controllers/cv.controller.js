import { getCV as getCVService, updateCV as updateCVService } from "../services/cv.service.js" ;


export async function getCV(req,res){
    if (!req.user) {
          return res.json(null);
    }
    try{
      const cv =await getCVService(req.user.student_id);
      return res.json(cv);
    } catch (err) {
        res.status(500).json({ error: "Failed to load user cv"});
    }
};

export async function updateCV(req,res){
    try{

        const uId =req.user.student_id;
        const {
            summary,
            education,
            experience
        } = req.body;
        
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