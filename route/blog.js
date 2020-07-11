const router = require('express').Router();
const { isValidToken } = require('../config/helper');
const { createBlog,
        getAllBlog,
        getBlogsByUser,
        addComment,
        getCommentByBlogId,
        updateLikeCount,
        getLikesByBlogId } = require('../controller/blog');

//create new blog
router.post("",[isValidToken],createBlog);

//get all blogs
router.get("",getAllBlog);


//get blog by user id
router.get("/user",getBlogsByUser);

//post commnet
router.post("/comment",[isValidToken],addComment);

//get All comment by blog it
router.get("/comment/:blogId",getCommentByBlogId);

//update like count
router.post("/like",[isValidToken],updateLikeCount);

//getAllLikes by blogId
router.get("/like",getLikesByBlogId);


module.exports = router;
