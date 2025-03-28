import mongoose, { Schema } from "mongoose";



const followSchema=new Schema({
    followedto:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true
    },
    followedby:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true
    },
    isfollowing:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})



const Follow=mongoose.models.Follow || mongoose.model("Follow",followSchema)


export {Follow}