const Mysqli = require('mysqli');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

let conn = new Mysqli({
    Host: 'localhost',
    port: 3306,
    user: 'root',
    passwd: '',
    db: 'angular_blog'
});

let db = conn.emit(false,'');

let secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";

module.exports = {
    secret:secret,
    database: db,
    hasRegistrationField: (req,res,next) => {
        const body = req.body;
        let errors = [];
        if(body) {
            if(!body.email) {
                errors.push("Missing email field");
             }
             if(!body.password) {
                 errors.push("Missing password field");
             }
             if(!body.fname) {
                 errors.push("Missing first name field");
             }
             if(!body.lname) {
                 errors.push("Missing last name field");
             }
             if(!body.dob) {
                 errors.push("Missing DOB field");
             }
             if(!body.location) {
                 errors.push("Missing Location");
             }
     
             if(errors.length) {
                 res.status(400).json({
                     success:0,
                     errors:errors.join(",")
                 });
             }else{
                 next();
             }
        }else{
            res.status(400).json({
                success:0,
                errors:"Missing fields"
            });
        }
    },
    checkUser: (req,res,next) => {
        db
        .table('users')
        .filter({
            $or: [
                {email:req.body.email}
            ]
        }).get().then(user => {
            if(user) {
                res.json({
                    success:0,
                    errors: "Username/Email already exists"
                });
            }else{
                next();
            }
        })
    },
    hasLoginField: (req,res,next) => {
        if(req.body) {
            let errors = [];
            if(!req.body.email) {
                 errors.push("Missing Email");
            }
            if(!req.body.password) {
                errors.push("Missing Password");
            }
            if(errors.length) {
                res.status(400).json({
                    success:0,
                    error:errors.join(",")
                });
            }else{
                next();
            }
        }else{
            res.status(400).json({
                success:0,
                error:"Missing Email and Password"
            });
        }
    },
    isPasswordAndUserMatch: async (req,res,next) => {
        const password = req.body.password;
        const email = req.body.email;
        const user = await db.table('users').filter({$or:[{email:email}]}).get();
    
        if(user) {
            const match = await bcrypt.compare(password,user.password);
            if(match) {
                req.body.email = user.email;
                req.body.password = undefined;
                req.body.username = user.username;
                req.body.id = user.id;
                
                next();
            }else{
                res.json({
                    success:0,
                    error: "Invalid email/password"
                });
            }
        }else{
            res.json({
                success:0,
                error: "Invalid email/password"
            });
        }
    },
    isValidToken: (req,res,next) => {
        if(req.headers['authorization']) {
            try{
                
                let authentication = req.headers['authorization'].split(' ');
                if(authentication[0]!="Bearer") {
                    res.status(401).json({
                        success:0,
                        errors:"Invalid Token"
                    });
                }else{
                    req.jwt = jwt.verify(authentication[1],secret);
                    next();
                }

            }catch(err) {
                res.status(403).json({
                    success:0,
                    errors:"Invalid Token"
                });
            }

        }else{
            res.status(401).json({
                success:0,
                errors: "No Authentication headers found"
            });
        }
    }
    

};