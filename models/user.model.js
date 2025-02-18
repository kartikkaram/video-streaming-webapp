
import mongoose ,{Schema} from "mongoose";


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    clerkid:{
        type:String,
        required:true,
        unique:true
    },
    imageurl:{
        type:String
    },
    bio:{
        type:String
    }
},
{timestamps:true}
)

 const User=mongoose.models.User || mongoose.model("User", userSchema) 

export {User}