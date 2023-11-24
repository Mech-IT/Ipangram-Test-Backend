import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type:String,
        required:true 
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false 

    }
  },{ timestamps: true });
  
  // Create a User model from the schema
  export const User = mongoose.model('User', userSchema);