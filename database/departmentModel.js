import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema({
    departmentName: {
      type: String,
      required: true,
    },
  },{ timestamps: true });
  
  // Create a User model from the schema
  const DepartmentModel = mongoose.model('Department', departmentSchema);

  export default DepartmentModel