import mongoose, { Schema } from "mongoose";



const blockSchema=new Schema({
    blocked:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true
    },
    blockedby:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true
    },
    isblocking:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})



const Block=mongoose.models.Block || mongoose.model("Block",blockSchema)


export {Block}