import mongoose from 'mongoose'

const NoticeSchema=new mongoose.Schema({

    title:{
        type:String,
        required:false,
        trim:true
    },
    body:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true,
        enum:["Low","Medium","High"],
        default:"Medium"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Notice=mongoose.model("Notice",NoticeSchema);
export default Notice;