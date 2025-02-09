import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
}
export default connectDb