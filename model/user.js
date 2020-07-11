const { database } = require("../config/helper");
const { use } = require("../route/blog");


module.exports = {
    get_user_info: (id,callback) => {
           database.table('users')
           .filter({id:id})
           .withFields(['id','email','fname','lname','dob','photoUrl','location','created_at'])  
           .get()
           .then(user => {
               if(user) {
                   return callback(null,user);
               }
               return callback("Invalid User Id");
           });
    },
    save_image_path:(req,callback)=>{
        const userId = req.body.userId;
        const imagePath = "http://localhost:3000/"+req.file.path;
        database.table('users')
                .filter({id:userId})
                .update({
                    photoUrl:imagePath
                })
                .then(lastId => {
                    if(lastId>0) {
                        return callback(null,"Image path added");
                    }
                    return callback("unable to add image path");
                });
    }
}