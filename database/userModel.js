import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default:""
    },
    jobPosition: {
      type: String,
      default:""
    },
    location:{
      type: String,
      required: true,
    },
    password:{
        type:String,
        required:true 
    },
  },{ timestamps: true });
  
  // Create a User model from the schema
  const UserModel = mongoose.model('User', userSchema);

  export default UserModel