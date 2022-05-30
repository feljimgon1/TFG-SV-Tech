const adminController = {};

const User = require('../models/User');
const Balance = require('../models/Balance');
const CuentaPerdidasGanancias = require('../models/CuentaPerdidasGanancias');
const EstrategiaCirculante = require('../models/EstrategiaCirculante');
const EstrategiaMercado = require('../models/EstrategiaMercado');
const PoliticaFinanciacion = require('../models/PoliticaFinanciacion');
const PoliticaInversion = require('../models/PoliticaInversion');

const BalanceAdmin = require('../models/plan-admin/BalanceAdmin');
const CuentaPerdidasGananciasAdmin = require('../models/plan-admin/CuentaPerdidasGananciasAdmin');
const EstrategiaMercadoAdmin = require('../models/plan-admin/EstrategiaMercadoAdmin')
const PoliticaInversionAdmin = require('../models/plan-admin/PoliticaInversionAdmin')
const PoliticaFinanciacionAdmin = require('../models/plan-admin/PoliticaFinanciacionAdmin')
const EstrategiaCirculanteAdmin = require('../models/plan-admin/EstrategiaCirculanteAdmin')

const jwt = require("jsonwebtoken");
const config = require("../../config/database");

adminController.getPlan = async (req, res) => {
    const user = await User.findById(req.params.id);
    const balance = await Balance.findOne({ userId: user._id })
    const CPYG = await CuentaPerdidasGanancias.findOne({ userId: user._id })
    const estrategiaMercado = await EstrategiaMercado.findOne({ userId: user._id })
    const politicaFinanciacion = await PoliticaFinanciacion.findOne({ userId: user._id })
    const politicaInversion = await PoliticaInversion.findOne({ userId: user._id })
    const estrategiaCirculante = await EstrategiaCirculante.findOne({ userId: user._id })
    res.send({
        user: user,
        balance: balance,
        CPYG: CPYG,
        estrategiaMercado: estrategiaMercado,
        politicaFinanciacion: politicaFinanciacion,
        politicaInversion: politicaInversion,
        estrategiaCirculante: estrategiaCirculante
    })
}

adminController.getBalance = async (req, res) => {
    const userBalance = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const balanceA = await BalanceAdmin.findOne({ userId: userBalance._id })
                    res.json({ success: true, message: message, balance: balanceA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editBalance = async (req, res) => {
    const userBalance = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await BalanceAdmin.findOneAndUpdate({ userId: userBalance._id }, req.body)
                    const balanceA = await BalanceAdmin.findOne({ userId: userBalance._id })
                    res.json({ success: true, message: message, balance: balanceA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.getCuentaPerdidasGanancias = async (req, res) => {
    const userCuentaPerdidasGanancias = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const cuentaPerdidasGananciasA = await CuentaPerdidasGananciasAdmin.findOne({ userId: userCuentaPerdidasGanancias._id })
                    res.json({ success: true, message: message, cuentaPerdidasGanancias: cuentaPerdidasGananciasA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador o propietario.'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editCuentaPerdidasGanancias = async (req, res) => {
    const userCuentaPerdidasGanancias = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await CuentaPerdidasGananciasAdmin.findOneAndUpdate({ userId: userCuentaPerdidasGanancias._id }, req.body)
                    const cuentaPerdidasGananciasA = await CuentaPerdidasGananciasAdmin.findOne({ userId: userCuentaPerdidasGanancias._id })

                    res.json({ success: true, message: message, cuentaPerdidasGanancias: cuentaPerdidasGananciasA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.getEstrategiaMercado = async (req, res) => {
    const userEstrategiaMercado = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const estrategiaMercadoA = await EstrategiaMercadoAdmin.findOne({ userId: userEstrategiaMercado._id })
                    res.json({ success: true, message: message, estrategiaMercado: estrategiaMercadoA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editEstrategiaMercado = async (req, res) => {
    const userEstrategiaMercado = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await EstrategiaMercadoAdmin.findOneAndUpdate({ userId: userEstrategiaMercado._id }, req.body)
                    const userEstrategiaMercadoA = await EstrategiaMercadoAdmin.findOne({ userId: userEstrategiaMercado._id })
                    res.json({ success: true, message: message, userEstrategiaMercado: userEstrategiaMercadoA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

//Política de Inversión

adminController.getPoliticaInversion = async (req, res) => {
    const userPoliticaInversion = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const politicaInversionA = await PoliticaInversionAdmin.findOne({ userId: userPoliticaInversion._id })
                    res.json({ success: true, message: message, politicaInversion: politicaInversionA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editPoliticaInversion = async (req, res) => {
    const userPoliticaInversion = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await PoliticaInversionAdmin.findOneAndUpdate({ userId: userPoliticaInversion._id }, req.body)
                    const userPoliticaInversionA = await PoliticaInversionAdmin.findOne({ userId: userPoliticaInversion._id })
                    res.json({ success: true, message: message, politicaInversion: userPoliticaInversionA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

//Política de Financiación

adminController.getPoliticaFinanciacion = async (req, res) => {
    const userPoliticaFinanciacion = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const politicaFinanciacionA = await PoliticaFinanciacionAdmin.findOne({ userId: userPoliticaFinanciacion._id })
                    res.json({ success: true, message: message, politicaFinanciacion: politicaFinanciacionA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editPoliticaFinanciacion = async (req, res) => {
    const userPoliticaFinanciacion = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await PoliticaFinanciacionAdmin.findOneAndUpdate({ userId: userPoliticaFinanciacion._id }, req.body)
                    const userPoliticaFinanciacionA = await PoliticaFinanciacionAdmin.findOne({ userId: userPoliticaFinanciacion._id })
                    res.json({ success: true, message: message, politicaFinanciacion: userPoliticaFinanciacionA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

//Estrategia de Circulante

adminController.getEstrategiaCirculante = async (req, res) => {
    const userEstrategiaCirculante = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN' || req.user_id == req.params.id) {
                    success = true
                    message = 'Acción completada'
                    const estrategiaCirculanteA = await EstrategiaCirculanteAdmin.findOne({ userId: userEstrategiaCirculante._id })
                    res.json({ success: true, message: message, estrategiaCirculante: estrategiaCirculanteA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

adminController.editEstrategiaCirculante = async (req, res) => {
    const userEstrategiaCirculante = await User.findById(req.params.id);
    var success = false
    var message = ''
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'ADMIN') {
                    success = true
                    message = 'Acción completada'
                    await EstrategiaCirculanteAdmin.findOneAndUpdate({ userId: userEstrategiaCirculante._id }, req.body)
                    const userEstrategiaCirculanteA = await EstrategiaCirculanteAdmin.findOne({ userId: userEstrategiaCirculante._id })
                    res.json({ success: true, message: message, estrategiaCirculante: userEstrategiaCirculanteA });
                } else {
                    success = false
                    message = 'El usuario debe ser administrador'
                    res.json({ success: success, message: message });
                }
            }
        });
    }

    catch (e) {
        res.json({ success: false, message: "No se ha proporcionado ningún token", error: e });
    }

}

//Usuario-Admin

adminController.planAdmin = async (req, res) => {
    let success = false
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret, async (err) => {
            if (err) {
                success = false
                res.json({ success: false, message: "El token proporcionado es inválido", });
            } else {
                const payload = jwt.verify(token, config.secret);
                req.user_id = payload._id;
                const user = await User.findById(req.user_id)
                if (user.rol == 'PREMIUM' || user.rol == 'MEDIUM') {
                    success = true
                    message = 'Devolución exitosa'
                    const balance = await BalanceAdmin.findOne({ userId: user._id })
                    const cuentaPerdidasGanancias = await CuentaPerdidasGananciasAdmin.findOne({ userId: user._id })
                    const estrategiaMercado = await EstrategiaMercadoAdmin.findOne({ userId: user._id })
                    const politicaInversion = await PoliticaInversionAdmin.findOne({ userId: user._id })
                    const politicaFinanciacion = await PoliticaFinanciacionAdmin.findOne({ userId: user._id })
                    const estrategiaCirculante = await EstrategiaCirculanteAdmin.findOne({ userId: user._id })
                    res.json({ success: success, message: message, balance: balance, cuentaPerdidasGanancias: cuentaPerdidasGanancias, estrategiaMercado: estrategiaMercado, politicaInversion: politicaInversion, politicaFinanciacion: politicaFinanciacion, estrategiaCirculante: estrategiaCirculante })
                }
            }
        })
    }
    catch (e) {
        res.json({ success: success, message: "No se ha proporcionado ningún token", error: e });
    }
}

//Perfil de usuario

adminController.getUserById = async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        res.send({ success: true, user: user });
    } else {
        res.send({ success: false, user: null, msg: 'No se pudo encontrar el usuario' });
    }
}

adminController.deleteUser = async (req, res) => {

    let user = await User.findById(req.params.id)
    if (user) {
        await User.findByIdAndDelete(req.params.id)
        res.send({ success: true, msg: 'Usuario eliminado'});
    } else {
        res.send({ success: false, user: null, msg: 'No se pudo encontrar el usuario' });
    }
}


module.exports = adminController;