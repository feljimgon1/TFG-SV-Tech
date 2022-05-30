const politicaFinanciacionController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const PoliticaFinanciacion = require('../models/PoliticaFinanciacion')
const User = require("../models/User");

politicaFinanciacionController.getAll = async (req, res) => {
    const politicaFinanciacion = await PoliticaFinanciacion.find()
    res.json(politicaFinanciacion)
}

politicaFinanciacionController.create = async(req,res)=>{
    try {
        console.log('Req body:', req.body);
        const politicaFinanciacion = await PoliticaFinanciacion.create(req.body);
        await User.findByIdAndUpdate({_id: req.body.userId}, {politicaFinanciacionId: politicaFinanciacion._id});
        res.status(200).json({success: true});  
    } catch(error) {
      console.log('ERROR: ', error);
      res.status(400).json({success: false, error});  
    }
  }

  politicaFinanciacionController.deletePoliticaFinanciacion = async (req, res) => {
    console.log(req.params);
    await PoliticaFinanciacion.findByIdAndDelete(req.params.politicaFinanciacion_id);
    res.send("Política de financiación eliminado");
  };

  politicaFinanciacionController.getPoliticaFinanciacion = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    req.user_id = payload._id
    const politicaFinanciacion = await PoliticaFinanciacion.findOne({userId: req.user_id})
    res.send({politicaFinanciacion: politicaFinanciacion})
  };
  
  politicaFinanciacionController.editPoliticaFinanciacion = async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    console.log(req.user_id);
    balance = await PoliticaFinanciacion.findOne({userId: req.user_id});
    await PoliticaFinanciacion.findByIdAndUpdate(balance._id, req.body);
    res.send(await PoliticaFinanciacion.findOne({userId: req.user_id}));
  };

module.exports = politicaFinanciacionController;