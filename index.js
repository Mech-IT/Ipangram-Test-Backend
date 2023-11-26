import express from "express"

const app = express();

import "./database/connection.js"

import cors from "cors"

import entryRouter from "./Routes/entry.js"
import departmentRouter from "./Routes/department.js"
import userRouter from "./Routes/userData.js"
import dotenv from "dotenv"

dotenv.config()

app.use(cors())

// Middleware to parse JSON data from incoming requests
app.use(express.json());

app.use('/api', entryRouter);
app.use('/api', departmentRouter);
app.use('/api', userRouter);
// app.use('/api', getNotApprovedBlogRoute);
// app.use('/api', approveBlog);
// app.use('/api', updateBlog);
// app.use('/api', deleteBlog);




// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
