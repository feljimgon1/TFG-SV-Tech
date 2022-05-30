const politicaInversionController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

const PoliticaInversion = require('../models/PoliticaInversion')
const User = require("../models/User");

politicaInversionController.getAll = async (req, res) => {
    const politicaInversion = await PoliticaInversion.find()
    res.json(politicaInversion)
}

politicaInversionController.create = async(req,res)=>{
    try {
        console.log('Req body:', req.body);
        const politicaInversion = await PoliticaInversion.create(req.body);
        await User.findByIdAndUpdate({_id: req.body.userId}, {politicaInversionId: politicaInversion._id});
        res.status(200).json({success: true});  
    } catch(error) {
      console.log('ERROR: ', error);
      res.status(400).json({success: false, error});  
    }
  }
  
politicaInversionController.deletePoliticaInversion = async (req, res) => {
    console.log(req.params);
    await PoliticaInversion.findByIdAndDelete(req.params.politicaInversion_id);
    res.send("Política de inversión eliminado");
  };

  politicaInversionController.getPoliticaInversion = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    req.user_id = payload._id
    const politicaInversion = await PoliticaInversion.findOne({userId: req.user_id})
    res.send({politicaInversion: politicaInversion})
  };
  
  politicaInversionController.editPoliticaInversion = async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    console.log(req.user_id);
    balance = await PoliticaInversion.findOne({userId: req.user_id});
    await PoliticaInversion.findByIdAndUpdate(balance._id, req.body);
    res.send(await PoliticaInversion.findOne({userId: req.user_id}));
  };

module.exports = politicaInversionController;