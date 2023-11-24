import express from "express"

const app = express();

import "./database/connection.js"

import cors from "cors"




import dotenv from "dotenv"

dotenv.config()

app.use(cors())

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// app.use('/api', loginRoute);
// app.use('/api', addBlogRoute);
// app.use('/api', getBlogRoute);
// app.use('/api', getNotApprovedBlogRoute);
// app.use('/api', approveBlog);
// app.use('/api', updateBlog);
// app.use('/api', deleteBlog);




// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
