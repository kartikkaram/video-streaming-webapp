import mongoose from "mongoose";


const connect =async function() {
    
    try {
        
        const connection= await mongoose.connect(`${process.env.MONGO_DB_URL}${process.env.MONGO_DB_NAME}`)

        console.log("mongodb connection successfull",connection.connections[0].host)
       

    } catch (error) {
        
        console.log("mongoDB connection failed", error.message)

    }

}

export {connect}