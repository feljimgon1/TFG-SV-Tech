const config = require("../../config/database")
const jwt = require("jsonwebtoken");

async function verifyToken(req,res,next){
    if(!req.headers.authorization){
      res.status(401).json({success: false, message: "No está autorizado"})
    }else{
      const token = req.headers.authorization.split(' ')[1]
  
      if(token==null){
        res.status(401).json({success: false, message: "No está autorizado"}) 
      }
  
      const payload = jwt.verify(token, config.secret)
      req.user_id = payload._id
      next()
    }
  }
module.exports = verifyToken