import mongoose from "mongoose";

 export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://tomato:tomato@cluster0.sfwdipl.mongodb.net/tomato-data').then(()=>console.log("DB connected"))
}