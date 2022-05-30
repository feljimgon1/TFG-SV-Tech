const estrategiaCirculanteController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const EstrategiaCirculante = require('../models/EstrategiaCirculante')
const User = require("../models/User");

estrategiaCirculanteController.getAll = async (req, res) => {
    const estrategiaCirculante = await EstrategiaCirculante.find()
    res.json(estrategiaCirculante)
}

estrategiaCirculanteController.create = async(req,res)=>{
    try {
      console.log('Req body:', req.body);
      const estrategiaCirculante = await EstrategiaCirculante.create(req.body);
      await User.findByIdAndUpdate({_id: req.body.userId}, {estrategiaCirculanteId: estrategiaCirculante._id});
      res.status(200).json({success: true});  
    } catch(error) {
      console.log('ERROR: ', error);
      res.status(400).json({success: false, error});  
    }
  }

  estrategiaCirculanteController.deleteEstrategiaCirculante = async (req, res) => {
    console.log(req.params);
    await EstrategiaCirculante.findByIdAndDelete(req.params.estrategiaCirculante_id);
    res.send("Estrategia de circulante eliminado");
  };

  estrategiaCirculanteController.getEstrategiaCirculante = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    req.user_id = payload._id
    const estrategiaCirculante = await EstrategiaCirculante.findOne({userId: req.user_id})
    res.send({estrategiaCirculante: estrategiaCirculante})
  };
  
  estrategiaCirculanteController.editEstrategiaCirculante = async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    console.log(req.user_id);
    balance = await EstrategiaCirculante.findOne({userId: req.user_id});
    await EstrategiaCirculante.findByIdAndUpdate(balance._id, req.body);
    res.send(await EstrategiaCirculante.findOne({userId: req.user_id}));
  };

module.exports = estrategiaCirculanteController;