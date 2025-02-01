import mongoose from "mongoose";
const cartSchema=new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'products'
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    quantity:{
        type:Number,
        required:true
    }
})