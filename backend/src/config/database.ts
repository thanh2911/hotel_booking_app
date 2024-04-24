import mongoose from "mongoose";

const connect = async () => {
    const URI = process.env.MONGODB_URL 
    try {
        await mongoose.connect(`${URI}`);
        console.log("Connected to MongoDB!");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
}

module.exports =  {connect} ;