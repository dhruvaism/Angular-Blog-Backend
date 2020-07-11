const { json } = require("body-parser");
const { get_user_info,save_image_path } = require("../model/user");


module.exports = {
    getUserInfo: (req,res) => {
        const id = req.params.id;
        get_user_info(id,(err,result) => {
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
        })
    },
    saveImagePath:(req,res) => {
        save_image_path(req,(err,result)=> {
             if(!err) {
                 res.json({
                     success:1,
                     result: result
                 });
             }else{
                 res.json({
                     success:0,
                     errors:err
                 });
             }
        });
    }
}