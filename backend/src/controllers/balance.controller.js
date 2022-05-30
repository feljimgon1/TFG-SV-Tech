const balanceController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const Balance = require("../models/Balance");
const User = require("../models/User");

balanceController.getAll = async (req, res) => {
  const balances = await Balance.find();
  res.json(balances);
};

  balanceController.create = async (req, res) => {
    try {
      console.log("Req body:", req.body);
      const balance = await Balance.create(req.body);
      console.log(balance._id);
      console.log(req.body.userId);
      await User.findByIdAndUpdate({_id: req.body.userId}, {balanceId: balance._id});
      res.status(200).json({ success: true });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(400).json({ success: false, error });
    };
  };

balanceController.deleteBalance = async (req, res) => {
  console.log(req.params);
  await Balance.findByIdAndDelete(req.params.balance_id);
  res.send("Balance eliminado");
};

balanceController.getBalance = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, config.secret)
  req.user_id = payload._id
  const balance = await Balance.findOne({userId: req.user_id})
  res.json({balance: balance})
};

balanceController.editBalance = async (req, res)=>{
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, config.secret);
  req.user_id = payload._id;
  balance = await Balance.findOne({userId: req.user_id});
  await Balance.findByIdAndUpdate(balance._id, req.body);
  res.send(await Balance.findOne({userId: req.user_id}));
};

module.exports = balanceController;