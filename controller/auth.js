const { create_user } = require('../model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/helper');


module.exports = {

    createUser: async (req,res) => {
        const body = req.body;
        body.password = await bcrypt.hash(body.password,10);
        create_user(body,(err,result) => {
            if(err) {
                return res.json({
                     success: 0,
                     message: err
                });
            }

            return res.status(200).json({
                success:1,
                message: result
            });
        });
    },
    login:  (req,res) => {
        const token = jwt.sign(req.body,secret);

        res.json({
            success:1,
            id:req.body.id,
            token:token
        });
    }

}