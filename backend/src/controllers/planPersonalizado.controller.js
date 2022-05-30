const planPersonalizadoController = {};

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

planPersonalizadoController.get = async (req, res, next) => {
  console.log(req.body)
  let planUser = await 
  res.send({data:'hola'})
};

module.exports = planPersonalizadoController;
