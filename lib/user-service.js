import { User } from '@/models/user.model'
import {connect} from "../db_connection/db_connection"







const getUserByUsername=async (username) => {
    
    try {
        
        await connect()
        const userMongoose= await User.findOne({username})

        
        if (!userMongoose) {
            throw new Error("user not found")
        }
        const user={...userMongoose.toObject(),_id:userMongoose._id.toString()}
        //.toObject() is required in case of .findOne but not in case      of .find() because findOne returns a mongoose document while find returns an array of mongoose document as plain objects  
        return user

        
    } catch (error) {
        
        console.log(error.message || "Internal error while fetching user");

    }


}

export {getUserByUsername}