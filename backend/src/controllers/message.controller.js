const messageController = {};

const User = require("../models/User");
const Message = require("../models/Message");

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

messageController.getAll = async (req,res)=>{
  let messages = await Message.find();
  res.send(messages);
}

messageController.postMessage = async (req, res, next) => {
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
        let message = req.body.message;

        res.json({success: '?'})
      }
    });
  }
};

messageController.getMessagesByUser = async (req,res)=>{
  let messagesSrc = await Message.find({srcUserId: req.params.id})
  let messagesDst = await Message.find({dstUserId: req.params.id})
  let messages = messagesSrc.concat(messagesDst)
  res.send(messages)
}

messageController.getMessages = async(req,res) => {
  let messagesSrc = await Message.find({srcUserId: req.params.src, dstUserId: req.params.dst})
  let messagesDst = await Message.find({srcUserId: req.params.dst, dstUserId: req.params.src})
  let messages = messagesSrc.concat(messagesDst)
  res.send(messages)
}

module.exports = messageController;