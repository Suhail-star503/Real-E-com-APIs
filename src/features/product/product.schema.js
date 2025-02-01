import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prize:{
        type:Number,
        required:true,
       
    },
    
    description:{
        type:String,
        required:true,
        
    },
    Stock:{
        type:Number,
        required:true,

    }



    
})