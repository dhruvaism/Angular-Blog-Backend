
const { create_post,
        get_all_blog,
        get_blog_by_user,
        add_comment,
        get_comment_by_blog_id,
        update_like_count,
        get_all_likes_by_blog_id
     } = require('../model/blog');

module.exports = {

    createBlog: (req,res) => {
        let body = req.body;

        if(body){

            let errors = [];
            if(!body.userId) {
                errors.push("userId missing");
            }
            if(body.blog) {      
                if(!body.blog.description) {
                    errors.push("blog description missing");
                }
            }else{
                errors.push("blog field missing");
            }
    
            if(errors.length > 0) {
                res.json({
                    success:0,
                    errors:errors.join(",")
                });
            }else{
                create_post(body,(err,result) => {
                    if(err) {
                        res.json({
                            success:0,
                            errors:err
                        });
                    }else{
                        res.json({
                            success:1,
                            result:result
                        });
                    }
                });
            }

        }else{
            res.status(401).json({
                success:0,
                errors:"Missing Fields"
            });
        }
       
        
    },
    getAllBlog: (req,res) => {
       if(req.query.start!=null){
        get_all_blog(req.query,(err,result) => {
            if(err) {
               res.json({
                success:0,
                errors:err
               });
            }else{
                res.json({
                    success:1,
                    result:result
                });
            }
        });
       } else{
           res.json({
               success:0,
               errors:"Field missing"
           });
       }
    },
    getBlogsByUser: (req,res) => {
        get_blog_by_user(req.query,(err,result) => {
            if(err) {
                res.json({
                    success:0,
                    errors:err
                });
            }else{
                res.json({
                    success:1,
                    result:result,
                });
            }
        })
    },
    addComment:(req,res) => {

        const body = req.body;
        let errors = [];
        if(!body.blogId) {
            errors.push("blog Id missing");
        }
        if(!body.userId) {
            errors.push("user Id missing");
        }
        if(!body.comment) {
            errors.push("comment missing");
        }
        if(errors.length>0) {
            res.json({
                success:0,
                errors:errors.join(',')
            });
        }else{
            add_comment(body,(err,result) => {
                if(err) {
                    res.json({
                        success:0,
                        errors:err
                    });
                }else{
                    res.json({
                        success:1,
                        result:result
                    });
                }
            });
        }
    },
    getCommentByBlogId:(req,res) => {
        get_comment_by_blog_id(req.params.blogId,(err,result) => {
               if(err) {
                   res.json({
                       success:0,
                       errors: err
                   });
               }else{
                   res.json({
                       success:1,
                       result:result
                   });
               }
        });
    },
    updateLikeCount:(req,res) => {
        const body = req.body;
        let errors = [];
        if(!body.blogId) {
            this.errors.push("missing blogId");
        }
        if(!body.userId) {
            this.errors.push("mising user Id");
        }
       
        if(errors.length>0) {
            res.json({
                success:0,
                errors:errors
            });
        }else{
            update_like_count(body,(err,result) => {
                if(!err) {
                    res.json({
                        success:1,
                        result: result
                    });
                }
            })
        }
    },
    getLikesByBlogId:(req,res) => {
        get_all_likes_by_blog_id(req.query.blogId,(err,result) => {
            if(err) {
                res.json({
                    success:0,
                    errors:err
                });
            }else{
                res.json({
                    success:1,
                    result:result
                });
            }
        });
    }
        


};