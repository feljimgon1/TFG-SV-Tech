/* const balanceController = require('./balance.controller');
 */const userController = {};

const User = require('../models/User');
const Balance = require('../models/Balance');
const CuentaPerdidasGanancias = require('../models/CuentaPerdidasGanancias');
const EstrategiaCirculante = require('../models/EstrategiaCirculante');
const EstrategiaMercado = require('../models/EstrategiaMercado');
const PoliticaFinanciacion = require('../models/PoliticaFinanciacion');
const PoliticaInversion = require('../models/PoliticaInversion');

/* const Balance = require('../models/Balance');
 */
/* balanceController.getBalances = async (req, res) =>{
    const balances = await Balance.find();
    res.json(balances);
}; */

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userController.getPreMedUsers = async (req, res) => {
    const premium = await User.find({ rol: 'PREMIUM' })
    const medium = await User.find({ rol: 'MEDIUM' })
    const total = premium.concat(medium)
    res.json(total)
}

userController.getPrem = async (req, res) => {
    const premium = await User.find({ rol: 'PREMIUM' })
    res.json(premium)
}

userController.getAdmin = async (req, res) => {
    const admin = await User.find({ rol: 'ADMIN' })
    res.json(admin)
}

userController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user)
};

userController.createUser = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    const newBalance = await new Balance({ userId: newUser._id }).save();
    const newcuentaPerdidasGananciasId = await new CuentaPerdidasGanancias({ userId: newUser._id }).save();
    const newEstrategiaMercado = await new EstrategiaMercado({ userId: newUser._id }).save();
    const newPoliticaFinanciacion = await new PoliticaFinanciacion({ userId: newUser._id }).save();
    const newPoliticaInversion = await new PoliticaInversion({ userId: newUser._id }).save();
    const newEstrategiaCirculante = await new EstrategiaCirculante({ userId: newUser._id }).save();
    await newUser.update({ balanceId: newBalance._id, cuentaPerdidasGananciasId: newcuentaPerdidasGananciasId._id, estrategiaCirculanteId: newEstrategiaCirculante._id, estrategiaMercadoId: newEstrategiaMercado._id, politicaFinanciacionId: newPoliticaFinanciacion._id, politicaInversionId: newPoliticaInversion._id })
};

userController.editUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
};

userController.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await Balance.findByIdAndDelete(user.balanceId);
        await CuentaPerdidasGanancias.findByIdAndDelete(user.cuentaPerdidasGananciasId);
        await EstrategiaCirculante.findByIdAndDelete(user.estrategiaCirculanteId);
        await EstrategiaMercado.findByIdAndDelete(user.estrategiaMercadoId);
        await PoliticaInversion.findByIdAndDelete(user.politicaInversionId);
        await PoliticaFinanciacion.findByIdAndDelete(user.politicaFinanciacionId);
        await User.findByIdAndDelete(req.params.id);
        res.send("Eliminado correctamente")
    }
    catch (err) {
        res.send("Error al eliminar")
    }
};
module.exports = userController;