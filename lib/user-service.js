import { User } from '@/models/user.model'
import {connect} from "../db_connection/db_connection"
import { Follow } from '@/models/follow.model'
import { authService } from './auth-service'






const getUserAndStreamByUsername=async (username) => {
    
    try {
        
        await connect()

        const self=await authService()

     

        const userMongoose= await User.aggregate([
            {
                $match:{username:username}
            },
            {
                $lookup:{
                    from:"streams",
                    as:"stream",
                   localField:"_id",
                   foreignField:"ownerid"
                }
            },
            {
                $unwind:{path: "$stream", preserveNullAndEmptyArrays: true}
            },
            {
                $project:{
                    _id:1,
                    username:1,
                    clerkid:1,
                   stream:1,
                   imageurl:1
                    }
                }
        ])

        if (!userMongoose.length) {
            throw new Error("user not found")
        }
    
        const userDoc=userMongoose[0]
        
        
        
        const user=  {...userDoc, _id:userDoc._id.toString(), stream:{...userDoc.stream, ownerid:userDoc.stream.ownerid.toString(),_id:userDoc.stream._id.toString()}}
        let followed
        if(self){
             followed=await Follow.findOne({
                followedto:userDoc._id ,
                followedby:self._id
            })
        }
        let streamer=await User.findOne({username})
        let following =await Follow.find({followedto:streamer._id})



        //this comment was made before when i was using findone, .toObject() is required in case of .findOne but not in case  of .find() because findOne returns a mongoose document while find returns an array of mongoose document as plain objects  
        return {user, followed:!!followed, followCount:following?.length}

        
    } catch (error) {
        throw new Error(error.message || "Internal error");
    }


}



export { getUserAndStreamByUsername}