const profileController = {};

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

profileController.get = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.json({
        success: false,
        message: "No se ha proporcionado ningún token",
      });
  } else {
    jwt.verify(token, config.secret, async (err) => {
      if (err) {
        res.json({
          success: false,
          message: "El token proporcionado es inválido",
        });
      } else {
        const payload = jwt.verify(token, config.secret);
        req.user_id = payload._id;
        const user = await User.findById(req.user_id)
        res.json({success: true, user:user})
      }
    });
  }
};

module.exports = profileController;
