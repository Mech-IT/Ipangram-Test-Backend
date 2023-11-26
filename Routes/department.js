import express from "express"
const router = express.Router();
import DepartmentModel from "../database/departmentModel.js"
import auth from "../Middleware/auth.js"

router.post("/createDepartment", auth , async (req, res) => {
    try {
        if(req.user.role !== "manager"){
            return res.status(401).json({ error: "Access Denied..." })
        }
        await DepartmentModel.create({...req.body})
        return res.status(200).json({ success: "Department created successfully." })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})

router.post("/updateDepartment", auth , async (req, res) => {
    try {
        if(req.user.role !== "manager"){
            return res.status(401).json({ error: "Access Denied..." })
        }
        await DepartmentModel.findByIdAndUpdate(req.body._id,{departmentName:req.body.departmentName})
        return res.status(200).json({ success: "Department updated successfully." })
    } catch (error) {
        console.log("error", error);
       return res.status(400).json({ error: "Something went wrong..." })
    }
})

router.post("/deleteDepartment", auth , async (req, res) => {
    try {
        if(req.user.role !== "manager"){
            return res.status(401).json({ error: "Access Denied..." })
        }
      await DepartmentModel.findByIdAndDelete(req.body.id)
      return res.status(200).json({ success: "Department deleted successfully." })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})

router.get("/getDepartments", auth , async (req, res) => {
    try {
        if(req.user.role !== "manager"){
            return res.status(401).json({ error: "Access Denied..." })
        }
        const departmentArray =  await DepartmentModel.find({})
        return res.status(200).json({departmentArray})
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})









export default router