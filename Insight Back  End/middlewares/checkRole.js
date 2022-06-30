const User = require("../models/User");

const checkRole = roles => async(req, res, next) =>{
    let user=await User.findById(req.user.id)
    if(roles.includes(user.role)){
        next();
    }
    else{
         return res
        .status(400)
        .json({ errors: [{ msg: "You are not authorized to access this route,please login from valid panel" }] });
    }
}

module.exports={
    checkRole
}
