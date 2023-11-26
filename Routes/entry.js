import express from "express"
const router = express.Router();


import UserModel from "../database/userModel.js"

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs"

import dotenv from "dotenv"
dotenv.config()


router.post("/signupUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserPresent = await UserModel.findOne({ email: email });

    if (isUserPresent) {
      return res.status(400).json({ error: "User already exist." })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    await UserModel.create({
      ...req.body,
      password: secPass,
    })

    return res.status(200).json({ success: "Signup successful..." })

  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "Something went wrong..." })
  }

})


router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const isUserPresent = await UserModel.findOne({ email: email })

    if (!isUserPresent) {
      return res.status(400).json({ error: "Provide valid credentials." })
    } else {
      const valid = await bcrypt.compare(password, isUserPresent.password);
      if (!valid) {
        return res.status(400).json({ error: "Please login with correct credentials" })
      }
      const data = {
        id: isUserPresent._id,
        email: isUserPresent.email,
        role: isUserPresent.role
      }
      
      const finalUser = await UserModel.findOne({email:email}).select("-password")

      

      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      return res.status(200).json({ authToken, currentUser: finalUser })
    }

  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "Something went wrong..." })
  }
})

export default router