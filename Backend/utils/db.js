import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URl);
        console.log ("MongoDB Connected");

}catch (error) {
    console.error(error.message);
}}

export default connectDB; 