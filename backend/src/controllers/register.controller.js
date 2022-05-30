const registerController = {};

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const Balance = require('../models/Balance');
const CuentaPerdidasGanancias = require('../models/CuentaPerdidasGanancias');
const EstrategiaCirculante = require('../models/EstrategiaCirculante');
const EstrategiaMercado = require('../models/EstrategiaMercado');
const PoliticaFinanciacion = require('../models/PoliticaFinanciacion');
const PoliticaInversion = require('../models/PoliticaInversion');

const InformacionAdicional = require('../models/InformacionAdicional');

const BalanceAdmin = require('../models/plan-admin/BalanceAdmin')
const CuentaPerdidasGananciasAdmin = require('../models/plan-admin/CuentaPerdidasGananciasAdmin');
const EstrategiaMercadoAdmin  = require('../models/plan-admin/EstrategiaMercadoAdmin');
const PoliticaInversionAdmin = require('../models/plan-admin/PoliticaInversionAdmin');
const PoliticaFinanciacionAdmin = require('../models/plan-admin/PoliticaFinanciacionAdmin');
const EstrategiaCirculanteAdmin = require('../models/plan-admin/EstrategiaCirculanteAdmin');

const CuentaPerdidasGananciasPrevisionales = require('../models/resultados/cuentaPerdidasGananciasPrevisionales')

registerController.register = async (req, res) => {

    if (!req.body.name) {
        res.json({ success: false, message: "Se debe proporcionar un nombre" })
    } else {
        if (!req.body.surname) {
            res.json({ success: false, message: "Se deben proporcionar los apellidos" })
        } else {
            if (!req.body.email) {
                res.json({ success: false, message: "Se debe proporcionar un correo electrónico" })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: "Se debe proporcionar una contraseña" })
                } else {
                    let user = new User({
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email.toLowerCase(),
                        password: req.body.password  
                    })
                    user.save(async (err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'El usuario ya está registrado en el sistema' })
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message })
                                    } else {
                                        if (err.errors.password) {
                                            res.json({ success: false, message: err.errors.password.message })
                                        } else {
                                            res.json({ success: false, message: "No se pudo crear el usuario", err })
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: "No se pudo crear el usuario", err })
                                }
                            }
                        } else {
                            const newInfoAdicional = await new InformacionAdicional({userId: user._id}).save();
                            const newBalance = await new Balance({userId: user._id}).save();
                            const newcuentaPerdidasGananciasId = await new CuentaPerdidasGanancias({userId: user._id}).save();
                            const newEstrategiaMercado = await new EstrategiaMercado({userId: user._id}).save();
                            const newPoliticaFinanciacion = await new PoliticaFinanciacion({userId: user._id}).save();
                            const newPoliticaInversion = await new PoliticaInversion({userId: user._id}).save();
                            const newEstrategiaCirculante = await new EstrategiaCirculante({userId: user._id}).save();
                            const newCuentaPerdidasGananciasResultado = await new CuentaPerdidasGananciasPrevisionales({userId: user._id}).save();

                            const newBalanceAdmin = await new BalanceAdmin({userId: user._id}).save();
                            const newCuentaPerdidasGananciasAdmin = await new CuentaPerdidasGananciasAdmin({userId: user._id}).save();
                            const newEstrategiaMercadoAdmin = await new EstrategiaMercadoAdmin({userId: user._id}).save();
                            const newPoliticaInversionAdmin = await new PoliticaInversionAdmin({userId: user._id}).save();
                            const newPoliticaFinanciacionAdmin = await new PoliticaFinanciacionAdmin({userId: user._id}).save();
                            const newEstrategiaCirculanteAdmin = await new EstrategiaCirculanteAdmin({userId: user._id}).save();

                            await user.update(
                                {
                                    balanceAdminId: newBalanceAdmin._id, 
                                    cuentaPerdidasGananciasAdminId: newCuentaPerdidasGananciasAdmin._id,
                                    estrategiaMercadoAdminId: newEstrategiaMercadoAdmin._id,
                                    politicaInversionAdminId: newPoliticaInversionAdmin._id,
                                    politicaFinanciacionAdminId: newPoliticaFinanciacionAdmin._id,
                                    estrategiaCirculanteAdminId: newEstrategiaCirculanteAdmin._id,

                                    cuentaPerdidasGananciasPrevisionalesId: newCuentaPerdidasGananciasResultado._id,
                                    
                                    informacionAdicionalId: newInfoAdicional._id,
                                    
                                    balanceId: newBalance._id, 
                                    cuentaPerdidasGananciasId: newcuentaPerdidasGananciasId._id, 
                                    
                                    estrategiaCirculanteId: newEstrategiaCirculante._id, 
                                    estrategiaMercadoId: newEstrategiaMercado._id, 
                                    politicaFinanciacionId: newPoliticaFinanciacion._id, 
                                    politicaInversionId: newPoliticaInversion._id
                                })

                            res.json({ success: true, message: "Usuario registrado" })
                        }
                    })
                }
            }
        }
    }
}


registerController.checkEmail = (req, res)=>{
    if(!req.params.email){
        res.json({ success: false, message: "No se ha proporcionado el email." })
    }else{
        User.findOne({email:req.params.email}, (err,user)=>{
            if(err){
                res.json({success:false, message: err})
            }else{
                if(user){
                    res.json({success:false, message: "El usuario ya está registrado en el sistema"})
                }else{
                    res.json({success:true, message: "Nuevo email registrado"})
                }
            }
        })
    }
}

//const user = new User(req.body);

/* await user.save();

    const token = await jwt.sign({_id: user._id}, 'secretkey');
    console.log(token)
    res.status(200).json({token});
    
}; */

module.exports = registerController;