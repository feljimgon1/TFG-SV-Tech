const estrategiaMercadoController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const EstrategiaMercado = require('../models/EstrategiaMercado')
const User = require("../models/User");

estrategiaMercadoController.getAll = async (req, res) => {
    const estrategiaMercado = await EstrategiaMercado.find()
    res.json(estrategiaMercado)
}

estrategiaMercadoController.create = async(req,res)=>{
    try {
        const estrategiaMercado = await EstrategiaMercado.create(req.body);
        console.log('Req body:', req.body);
        console.log(estrategiaMercado._id);
        await User.findByIdAndUpdate({_id: req.body.userId}, {estrategiaMercadoId: estrategiaMercado._id});
        res.status(200).json({success: true});  
    } catch(error) {
      console.log('ERROR: ', error);
      res.status(400).json({success: false, error});  
    }
  }

  estrategiaMercadoController.deleteEstrategiaMercado = async (req, res) => {
    console.log(req.params);
    await EstrategiaMercado.findByIdAndDelete(req.params.estrategiaMercado_id);
    res.send("Estrategia de mercado eliminado");
  };

  estrategiaMercadoController.getEstrategiaMercado = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    req.user_id = payload._id
    const estrategiaMercado = await EstrategiaMercado.findOne({userId: req.user_id})
    res.send({estrategiaMercado: estrategiaMercado})
  };
  
  estrategiaMercadoController.editEstrategiaMercado = async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    console.log(req.user_id);
    balance = await EstrategiaMercado.findOne({userId: req.user_id});
    await EstrategiaMercado.findByIdAndUpdate(balance._id, req.body);
    res.send(await EstrategiaMercado.findOne({userId: req.user_id}));
  };

module.exports = estrategiaMercadoController;