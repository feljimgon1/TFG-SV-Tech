const cuentaPerdidasGananciasController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const CuentaPerdidasGanancias = require('../models/CuentaPerdidasGanancias')
const User = require("../models/User");

cuentaPerdidasGananciasController.getAll = async (req, res) => {
    const cuentaPerdidasGanancias = await CuentaPerdidasGanancias.find()
    res.json(cuentaPerdidasGanancias)
}

cuentaPerdidasGananciasController.create = async(req,res)=>{
    try {
      console.log('Req body:', req.body);
      const cuentaPerdidasGanancias = await CuentaPerdidasGanancias.create(req.body);
      await User.findByIdAndUpdate({_id: req.body.userId}, {cuentaPerdidasGananciasId: cuentaPerdidasGanancias._id});
      res.status(200).json({success: true});  
    } catch(error) {
      console.log('ERROR: ', error);
      res.status(400).json({success: false, error});  
    }
  }

  cuentaPerdidasGananciasController.deleteCuentaPerdidasGanancias = async (req, res) => {
    console.log(req.params);
    await CuentaPerdidasGanancias.findByIdAndDelete(req.params.cuentaPerdidasGananciasId);
    res.send("Cuenta de pérdidas y ganancias eliminado");
  };

  cuentaPerdidasGananciasController.getCuentaPerdidasGanancias = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    req.user_id = payload._id
    const cuentaPerdidasGanancias = await CuentaPerdidasGanancias.findOne({userId: req.user_id})
    res.send({cuentaPerdidasGanancias: cuentaPerdidasGanancias})
  };
  
  cuentaPerdidasGananciasController.editCuentaPerdidasGanancias = async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    console.log(req.user_id);
    balance = await CuentaPerdidasGanancias.findOne({userId: req.user_id});
    await CuentaPerdidasGanancias.findByIdAndUpdate(balance._id, req.body);
    res.send(await CuentaPerdidasGanancias.findOne({userId: req.user_id}));
  };

module.exports = cuentaPerdidasGananciasController;