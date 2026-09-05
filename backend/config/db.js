import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://foodDel:Arun0809@cluster0.xdtmv2q.mongodb.net/food-del').then(()=>console.log("DB connected"))
}