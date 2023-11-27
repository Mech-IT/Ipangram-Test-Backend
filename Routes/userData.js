import express from "express"
const router = express.Router();
import UserModel from "../database/userModel.js"
import auth from "../Middleware/auth.js"

router.get("/getUser", auth, async (req, res) => {
    try {
        const user = await UserModel.findOne({email:req.user.email})

        return res.status(200).json({user})
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})


router.post("/updateUser", auth, async (req, res) => {
    try {
         
        if (req.user.role == "employee") {
            const user = await UserModel.findByIdAndUpdate(req.user.id, { firstName: req.body.firstName, lastName: req.body.lastName, location: req.body.location},{new:true})
            return res.status(200).json({success:"Profile updated successfully.",user})
        }else{
            const user = await UserModel.findByIdAndUpdate(req.user.id, { firstName: req.body.firstName, lastName: req.body.lastName, location: req.body.location, jobPosition: req.body.jobPosition, department: req.body.department },{new:true})
           
            return res.status(200).json({success:"Profile updated successfully.",user})
        }

        
        

    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})


router.post("/deleteEmployee", auth, async (req, res) => {
    try {
        if (req.user.role !== "manager") {
            return res.status(401).json({ error: "Access Denied..." })
        }
        await UserModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:"Employee deleted successfully."})
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})



router.post("/getEmployee", auth, async (req, res) => {
    try {
        const { searchTerm, filterOption, sortOrder, indexOfFirstRecord, indexOfLastRecord } = req.body;

        
        const matchStage = {
            $match: {
                $and: [
                    { role: "employee" },
                    { department: { $regex: new RegExp(searchTerm, "i") } }, 
                ]
            }
        };

        
        const projectStage = {
            $project: {
                fullName: { $concat: ["$firstName", " ", "$lastName"] },
                firstName:1,
                lastName:1,
                location:1,
                role:1,
                email:1,
                jobPosition:1,
                department:1
                
            }
        };

        
        const sortField = filterOption === "name" ? "fullName" : filterOption;
        const sortStage = {
            $sort: {
                [sortField]: sortOrder === "asc" ? 1 : -1
            }
        };

        
        const skip = indexOfFirstRecord ? parseInt(indexOfFirstRecord) : 0;
        const limit = indexOfLastRecord ? parseInt(indexOfLastRecord) - skip + 1 : 10; 

        const skipStage = {
            $skip: skip
        };

        const limitStage = {
            $limit: limit
        };

        
        const pipeline = [matchStage, projectStage, sortStage, skipStage, limitStage];

        const userArray = await UserModel.aggregate(pipeline);

        res.status(200).json({ userArray });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." });
    }
});







router.post("/updateEmployee", auth, async (req, res) => {
    try {
        if (req.user.role !== "manager") {
            return res.status(401).json({ error: "Access Denied..." })
        }
        const user = await UserModel.findByIdAndUpdate(req.body._id,{jobPosition:req.body.jobPosition,department:req.body.department},{new:true})
        return res.status(200).json({success:"Employee updated successfully."})
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})

export default router