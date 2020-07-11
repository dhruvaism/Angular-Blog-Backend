const { database } = require("../config/helper");
const blog = require("../controller/blog");


module.exports = {
   
    create_post: (data,callback) => {
        let {userId,blog} = data;
        database.table('users')
        .filter({id:userId})
        .get()
        .then(user => {
            if(user) {
                        database.table('blog_details')
                        .insert({
                            description: blog.description,
                            image_1:blog.image_1,
                            image_2:blog.image_2,
                            image_3:blog.image_3,
                            image_4:blog.image_4
                        })
                        .then(lastId => {
                            database.table('blog')
                            .insert({
                                user_id:userId,
                                blog_details_id:lastId
                            })
                            .then(lastId => {
                                if(lastId > 0) {
                                    return callback(null,`Successfully created with id ${lastId}`);
                                }else{
                                    return callback("Unable to create blog");
                                }
                            })
                        });
               
            }else{
                return callback("No User with userId "+userId);
            }
        })
        .catch(err => {
            if(err) {
                return callback(err);
            }
        });
    },
    get_all_blog:(data,callback) => {
        database.table('blog as b')
        .join([
            {
                table:'users as u',
                on: 'u.id = b.user_id'
            },
            {
                table:'blog_details as bd',
                on: 'bd.id = b.blog_details_id'
            }
        ])
        .withFields(['b.id','b.user_id','u.fname','u.lname','u.photoUrl','bd.description','bd.image_1','bd.image_2','bd.image_3','bd.image_4','b.created_at'])
        .sort({'b.created_at':-1})
        .slice(data.start,data.start+10)
        .getAll()
        .then(blogs => {
            if(blogs) {
                return callback(null,blogs);
            }else{
                return callback("No blogs available");
            }
        })
        .catch(err => {
            return callback(err);
        });
    },
    get_blog_by_user:(data,callback)=> {
        database.table('blog as b')
        .join([
            {
                table:'users as u',
                on: 'u.id = b.user_id'
            },
            {
                table:'blog_details as bd',
                on: 'bd.id = b.blog_details_id'
            }
        ])
        .filter({'u.id':data.userId})
        .withFields(['b.id','b.user_id','u.fname','u.lname','u.photoUrl','bd.description','bd.image_1','bd.image_2','bd.image_3','bd.image_4','b.created_at'])
        .sort({'b.created_at':-1})
        .slice(data.start,data.start+10)
        .getAll()
        .then(blogs => {
            if(blogs) {
                return callback(null,blogs);
            }else{
                return callback("No blogs available");
            }
        })
        .catch(err => {
            return callback(err);
        });
    },
    add_comment:(body,callback)=> {
        database.table('comments')
        .insert({
            blog_id:body.blogId,
            user_id:body.userId,
            comment: body.comment
        })
        .then(lastId=> {
            if(lastId>0) {
                return callback(null,"comment added with id "+lastId);
            }else{
                return callback("Unable to add comment");
            }
        });
    },
    get_comment_by_blog_id:(blogId,callback)=> {
        database.table('comments as c')
                .join([
                    {
                        table: 'blog as b',
                        on: 'c.blog_id = b.id'
                    },
                    {
                        table: 'users as u',
                        on: 'c.user_id = u.id'
                    }
                ])
                .filter({'b.id':blogId})
                .withFields(['c.user_id','u.fname','u.lname','u.photoUrl','c.comment'])
                .getAll()
                .then(comments => {
                     return callback(null,comments);
                   
                });
    },
    update_like_count:  (body,callback)=> {
       let {blogId,userId} = body;
       database.table('likes as l')
               .join([
                   {
                       table:'blog as b',
                       on:'b.id = l.blog_id'
                   },
                   {
                       table:'users as u',
                       on:'u.id = l.user_id'
                   }
               ])
               .filter({'l.user_id':userId,'l.blog_id':blogId})
               .withFields(['l.id'])
               .get()
               .then(Id => {
                  if(Id) {
                      console.log(Id);
                      database.table('likes')
                              .filter({id:Id.id})
                              .remove()
                              .then(result => {
                                return callback(null,"like deducted");
                              })
                  }else{
                      database.table('likes')
                              .insert({
                                  blog_id:blogId,
                                  user_id:userId
                              })
                              .then(lastId => {
                                  if(lastId>0) {
                                      return callback(null,"like added");
                                  }else{
                                      return callback("unable to add like");
                                  }
                              })
                  }
               });


    },
    get_all_likes_by_blog_id:(blogId,callback)=>{
        database.table('likes as l')
        .join([
            {
                table: 'blog as b',
                on: 'l.blog_id = b.id'
            },
            {
                table: 'users as u',
                on: 'l.user_id = u.id'
            }
        ])
        .filter({'b.id':blogId})
        .withFields(['l.user_id','u.fname','u.lname'])
        .getAll()
        .then(likes => {
                 return callback(null,likes);
            
        });
    }


};