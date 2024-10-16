import mongoose from "mongoose";

const connectToMongodb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongo db`)
    } catch (error) {
        console.log("error in connecting mongodb",error.message)
    }
}

export default connectToMongodb;