const informacionAdicionalController = {};
var nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const User = require("../models/User")
const InformacionAdicional = require("../models/InformacionAdicional");

informacionAdicionalController.getAll = async (req, res) => {
  const infoAdicionales = await InformacionAdicional.find();
  res.json(infoAdicionales);
};

informacionAdicionalController.get = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, config.secret);
  req.user_id = payload._id;
  const user = await User.findById(req.user_id);
  infoAdicional = await InformacionAdicional.findOne({ userId: req.user_id });
  res.send({infoAdicional:infoAdicional})
};


informacionAdicionalController.create = async (req, res) => {
  try {
    console.log("Req body:", req.body);
    const info = await InformacionAdicional.create(req.body);
    await User.findByIdAndUpdate({ _id: req.body.userId }, { informacionAdicionalId: info._id });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(400).json({ success: false, error });
  };
};

informacionAdicionalController.edit = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, config.secret);
  req.user_id = payload._id;
  const user = await User.findById(req.user_id);
  infoAdicional = await InformacionAdicional.findOne({ userId: req.user_id });
  console.log(req.body)
  await InformacionAdicional.findByIdAndUpdate(infoAdicional._id, req.body);

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'svtech.information@gmail.com',
  //     pass: '$56oldNew'
  //   }
  // });

  // var message = `<p>${user.name} ha enviado:
  // <ul>
  // <li>N: ${user.name}</li>
  // <li>S: ${user.surname}</li>
  // <li>Email: ${user.email}</li>
  // </ul>
  // </p>`

  // var mailOptions = {
  //   from: 'svtech-information@gmail.com',
  //   to: 'fjimenez@us.es',
  //   subject: '¡Esto es un mensaje de SVTech!',
  //   html: message 
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });

  res.send(await InformacionAdicional.findOne({ userId: req.user_id }));
};

module.exports = informacionAdicionalController;