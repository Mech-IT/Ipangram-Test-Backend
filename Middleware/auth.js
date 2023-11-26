import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken";

const auth = (req, res, next)=>{
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { id, role, email } = data;
        req.user = { id, role, email };
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
        
    }
}

export default auth