import mongoose from 'mongoose';
 
const connectDB = async() => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch (error){
         
       console.log(`Error Connection on MongoDB: ${error.message}`);
       process.exit(1);// pure server ko band krna

    }
};
export default connectDB;