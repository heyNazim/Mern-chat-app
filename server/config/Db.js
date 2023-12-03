import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connect successfully ${conn.connection.host}`.bgMagenta)
    } catch (error) {
        console.log(`Something went wrong in database ${error}`)
    }
};

export default connectDb;