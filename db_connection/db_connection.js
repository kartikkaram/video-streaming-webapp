
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_DB_URL;
const MONGODB_NAME =process.env.MONGO_DB_NAME;

if (!MONGODB_URL) {
    throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
}

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    
    cached.promise = mongoose
    .connect(`${MONGODB_URL}${MONGODB_NAME}`, opts)
    .then(() => mongoose.connection);
}

try {
    cached.conn = await cached.promise;
} catch (e) {
    cached.promise = null;
    throw e;
}

return cached.conn;
}




//simpler way but less efficient

// import mongoose from "mongoose";

// let connected=false
// const connect =async function() {
    
//     try {
//         if (connected) {
//             return
//         }
//         else{
//             const connection= await mongoose.connect(`${process.env.MONGO_DB_URL}${process.env.MONGO_DB_NAME}`)
//             console.log("mongodb connection successfull",connection.connections[0].host)
//             if (connection) {
    //                 connected=true
    //             }
    //         }
    
    
    //     } catch (error) {
        
    //         console.log("mongoDB connection failed", error.message)
    
    //     }
    
    // }
    
  // export {connect}







