const express = require('express');
const cors = require('cors');
const authRouter = require('./route/auth');
const blogRouter = require('./route/blog');
const userRouter = require('./route/user');
const { static } = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/uploads',express.static('uploads'));

app.use("/auth",authRouter);
app.use("/blog",blogRouter);
app.use("/user",userRouter);



app.listen(3000, ()=> {
    console.log("Server running at 3000");
})