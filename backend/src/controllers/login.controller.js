const loginController = {};

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

loginController.login = async (req, res) => {
  if(!req.body.email){
    res.json({success: false, message: 'Se debe proporcionar un email'})
  }else{
    if(!req.body.password){
      res.json({success: false, message: 'Se debe proporcionar una contraseña'})
    }else{
      User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
          res.json({success: false, message: err});
        }else{
          if(!user){
            res.json({success: false, message: 'No se encuentra el usuario'})
          }else{
            const validPassword = user.comparePassword(req.body.password)
            if(!validPassword){
              res.json({success: false, message: 'Contraseña incorrecta'})
            }else{
              const token = jwt.sign({_id: user._id}, config.secret  ,{expiresIn: '24h'})
              res.json({success: true, message: 'Sesión iniciada', token: token, user: {email: user.email, rol: user.rol}})
            }
          }
        }
      })
    }
  }
}
module.exports = loginController;
