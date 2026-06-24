import Notice from "../modals/Notice.js";

export const createNotice=async(req,res)=>{

    try{
        const {title,body,priority}=req.body;
        const newNotice=await Notice.create({
            title:title,
            body:body,
            priority:priority,
            createdBy:req.user.id
        })
        res.status(200).json({
            success:true,
            data:newNotice
        })
    }
    catch(error){
       
        res.status(500).json({success:false,message:"Internal Server Error",error});
    }

}
export const getAllNotice=async(req,res)=>{
    try{
        const notices=await Notice.find().sort({createdAt:-1}).populate('createdBy','username');
        
        res.status(200).json({success:true, data:notices})
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error",error});
    }
}

export const NoticeController={
    createNotice,
    getAllNotice

}