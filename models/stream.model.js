
import mongoose ,{Schema} from "mongoose";


const streamSchema=new Schema({
    ownername:{
        type:String,
        unique:true,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    ingressid:{
        type:String,
    },
    serverurl:{
        type:String
    },
    streamkey:{
        type:String
    },
    title:{
        type:String,
        index:true
    },
    ownerid:{
          type:Schema.Types.ObjectId,
          ref:"User",
    },
    islive:{
        type:Boolean,
        default:false
    },
    ischatenabled:{
        type:Boolean,
        default:true
    },
    ischatdelayed:{
        type:Boolean,
        default:false
    },
    ischatfollowersonly:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
)

streamSchema.index({ ingressid: 1 }, { unique: true, partialFilterExpression: { ingressid: { $ne: null } } });
// Create a partial index for the `ingressid` field:
// - `{ ingressid: 1 }`: Specifies the field (`ingressid`) to index in ascending order.
// - `unique: true`: Ensures that the values in the `ingressid` field are unique across documents.
// - `partialFilterExpression: { ingressid: { $ne: null } }`: Applies the unique constraint only to documents where `ingressid` is not `null`.


 const Stream=mongoose.models.Stream || mongoose.model("Stream", streamSchema) 

export {Stream}