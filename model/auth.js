const helper = require("../config/helper")


module.exports = {
  //Create user
  create_user: (data,callBack) => {
      console.log(data);
      helper.database
               .table('users')
               .insert({
                password: data.password,
                email: data.email,
                fname: data.fname,
                lname:data.lname,
                location:data.location,
                dob: data.dob
               })
               .then(lastId => {
                   if(lastId > 0) {
                       return callBack(null,"Registration successfull");
                   }else{
                       return callBack("Registration failed");
                   }
               }).catch(error => {
                   return callBack(error);
               });
  }

}

