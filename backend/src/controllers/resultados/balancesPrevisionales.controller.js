const balancesPrevisionalesController = {};

const jwt = require("jsonwebtoken");
const config = require("../../../config/database");

const Balance = require("../../models/Balance");
const EstrategiaMercado = require("../../models/EstrategiaMercado");
const CuentaPerdidasGanancias = require("../../models/CuentaPerdidasGanancias");
const PoliticaInversion = require("../../models/PoliticaInversion");
const PoliticaFinanciacion = require("../../models/PoliticaFinanciacion");
const EstrategiaCirculante = require("../../models/EstrategiaCirculante");

async function getCuentaPerdidasGanancias(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const cuentaPerdidasGanancias = await CuentaPerdidasGanancias.findOne({ userId: req.user_id })
    return cuentaPerdidasGanancias
}

async function getBalance(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const balance = await Balance.findOne({ userId: req.user_id })
    return balance
}

async function getEstrategiaMercado(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const estrategiaMercado = await EstrategiaMercado.findOne({ userId: req.user_id })
    return estrategiaMercado
}

async function getPoliticaInversion(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const politicaInversion = await PoliticaInversion.findOne({ userId: req.user_id })
    return politicaInversion
}

async function getPoliticaFinanciacion(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const politicaFinanciacion = await PoliticaFinanciacion.findOne({ userId: req.user_id })
    return politicaFinanciacion
}

async function getEstrategiaCirculante(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const estrategiaCirculante = await EstrategiaCirculante.findOne({ userId: req.user_id })
    return estrategiaCirculante
}

async function getCuentaPerdidasGananciasPrevisionales(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const auxFunction = require('../auxiliares/auxiliarBalance')
    const cuentaPerdidasGananciasPrevisionales = await auxFunction(req, res)
    return cuentaPerdidasGananciasPrevisionales
}

async function inmovilizadoInmaterialM(req, res, balance, politicaInversion) {

    const inmovilizadoInmaterial = [
        balance.inmovilizadoInmaterial,
        balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialUno - (politicaInversion.inversionInmovilizadoInmaterialUno + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialUno,
        (balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialUno - (politicaInversion.inversionInmovilizadoInmaterialUno + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialUno) + politicaInversion.inversionInmovilizadoInmaterialDos - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialDos,
        ((balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialUno - (politicaInversion.inversionInmovilizadoInmaterialUno + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialUno) + politicaInversion.inversionInmovilizadoInmaterialDos - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialDos) + politicaInversion.inversionInmovilizadoInmaterialTres - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialTres,
        (((balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialUno - (politicaInversion.inversionInmovilizadoInmaterialUno + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialUno) + politicaInversion.inversionInmovilizadoInmaterialDos - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialDos) + politicaInversion.inversionInmovilizadoInmaterialTres - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialTres) + politicaInversion.inversionInmovilizadoInmaterialCuatro - (politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialCuatro,
        ((((balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialUno - (politicaInversion.inversionInmovilizadoInmaterialUno + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialUno) + politicaInversion.inversionInmovilizadoInmaterialDos - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial) / politicaInversion.vidaInmInmaterialDos) + politicaInversion.inversionInmovilizadoInmaterialTres - (politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialTres) + politicaInversion.inversionInmovilizadoInmaterialCuatro - (politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialCuatro) + politicaInversion.inversionInmovilizadoInmaterialCinco - (politicaInversion.inversionInmovilizadoInmaterialCinco + politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoInmaterialDos + balance.inmovilizadoInmaterial + politicaInversion.inversionInmovilizadoInmaterialTres) / politicaInversion.vidaInmInmaterialCinco
    ]

    return inmovilizadoInmaterial
}

async function inmovilizadoMaterialM(req, res, balance, politicaInversion) {

    const inmovilizadoMaterial = [
        balance.inmovilizadoMaterial,
        balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialUno - (politicaInversion.inversionInmovilizadoMaterialUno + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialUno,
        (balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialUno - (politicaInversion.inversionInmovilizadoMaterialUno + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialUno) + politicaInversion.inversionInmovilizadoMaterialDos - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialDos,
        ((balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialUno - (politicaInversion.inversionInmovilizadoMaterialUno + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialUno) + politicaInversion.inversionInmovilizadoMaterialDos - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialDos) + politicaInversion.inversionInmovilizadoMaterialTres - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialTres,
        (((balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialUno - (politicaInversion.inversionInmovilizadoMaterialUno + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialUno) + politicaInversion.inversionInmovilizadoMaterialDos - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialDos) + politicaInversion.inversionInmovilizadoMaterialTres - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialTres) + politicaInversion.inversionInmovilizadoMaterialCuatro - (politicaInversion.inversionInmovilizadoMaterialCuatro + politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialCuatro,
        ((((balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialUno - (politicaInversion.inversionInmovilizadoMaterialUno + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialUno) + politicaInversion.inversionInmovilizadoMaterialDos - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial) / politicaInversion.vidaInmMaterialDos) + politicaInversion.inversionInmovilizadoMaterialTres - (politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialTres) + politicaInversion.inversionInmovilizadoMaterialCuatro - (politicaInversion.inversionInmovilizadoMaterialCuatro + politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialCuatro) + politicaInversion.inversionInmovilizadoMaterialCinco - (politicaInversion.inversionInmovilizadoMaterialCinco + politicaInversion.inversionInmovilizadoMaterialCuatro + politicaInversion.inversionInmovilizadoMaterialUno + politicaInversion.inversionInmovilizadoMaterialDos + balance.inmovilizadoMaterial + politicaInversion.inversionInmovilizadoMaterialTres) / politicaInversion.vidaInmMaterialCinco
    ]

    return inmovilizadoMaterial
}

async function otrosActivosFijosM(req, res, balance) {

    const otrosActivosFijos = [
        balance.otrosActivosFijos
    ]

    return otrosActivosFijos
}

async function existenciasM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales) {

    const existencias = [
        balance.existencias,
        estrategiaCirculante.periodoMedioExistenciaUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365,
        estrategiaCirculante.periodoMedioExistenciaDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365,
        estrategiaCirculante.periodoMedioExistenciaTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365,
        estrategiaCirculante.periodoMedioExistenciaCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365,
        estrategiaCirculante.periodoMedioExistenciaCinco * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][4]) / 365,
    ]
    return existencias
}

async function deudoresM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales) {

    const deudores = [
        balance.deudores,
        estrategiaCirculante.periodoMedioCobroUno * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][0] / 365,
        estrategiaCirculante.periodoMedioCobroDos * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][1] / 365,
        estrategiaCirculante.periodoMedioCobroTres * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][2] / 365,
        estrategiaCirculante.periodoMedioCobroCuatro * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][3] / 365,
        estrategiaCirculante.periodoMedioCobroCinco * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][4] / 365,
    ]
    return deudores
}

async function otrosActivosLiquidosM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let otrosActivosLiquidosAux = require('../auxiliares/auxiliarOtrosActivosLiquidos')

    let oAL = await otrosActivosLiquidosAux(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    const otrosActivosLiquidos = [
        balance.otrosActivosLiquidos,
        oAL[0],
        oAL[1],
        oAL[2],
        oAL[3],
        oAL[4]
    ]

    return otrosActivosLiquidos
}

async function capitalSuscritoM(req, res, balance, politicaFinanciacion) {

    const capitalSuscrito = [
        balance.capitalSuscrito,
        balance.capitalSuscrito + ((1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital),
        (balance.capitalSuscrito + ((1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital)),
        (balance.capitalSuscrito + ((1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital)),
        (balance.capitalSuscrito + ((1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital)),
        (balance.capitalSuscrito + ((1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital)),
    ]
    return capitalSuscrito
}

async function otrosFondosPropiosM(req, res, balance, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion) {

    const otrosFondosPropios = [
        balance.otrosFondosPropios,
        (balance.otrosFondosPropios) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][0] + (politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital),
        (balance.otrosFondosPropios) + (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][0] + (politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital)) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][1],
        (balance.otrosFondosPropios) + ((cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][0] + (politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital)) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][1]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][2],
        (balance.otrosFondosPropios) + (((cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][0] + (politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital)) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][1]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][2]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][3],
        (balance.otrosFondosPropios) + ((((cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][0] + (politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital)) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][1]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][2]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][3]) + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["resultadoDelEjercicio"][4]
    ]
    return otrosFondosPropios
}

async function deudaNuevaM(req, res, balance, politicaFinanciacion) {

    const deudaNueva = [
        balance.acreedoresLP,
        politicaFinanciacion.deudaNuevaUno - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno,
        (politicaFinanciacion.deudaNuevaUno - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos,
        ((politicaFinanciacion.deudaNuevaUno - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres,
        (((politicaFinanciacion.deudaNuevaUno - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres,
        ((((politicaFinanciacion.deudaNuevaUno - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres) - politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres
    ]
    return deudaNueva
}

async function deudaAntiguaM(req, res, balance, politicaFinanciacion) {

    const deudaAntigua = [
        balance.otrosPasivosFijos,
        balance.otrosPasivosFijos - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno,
        (balance.otrosPasivosFijos - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos,
        ((balance.otrosPasivosFijos - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres,
        (((balance.otrosPasivosFijos - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCuatro,
        ((((balance.otrosPasivosFijos - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCuatro) - balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCinco
    ]
    return deudaAntigua
}

async function provisionesM(req, res, balance) {

    const provisiones = [
        balance.provisiones
    ]
    return provisiones
}

async function deudasFinancierasM(req, res, balance) {

    const deudasFinancieras = [
        balance.deudasFinancieras,
        balance.deudasFinancieras,
        balance.deudasFinancieras,
        balance.deudasFinancieras,
        balance.deudasFinancieras,
        balance.deudasFinancieras
    ]
    return deudasFinancieras
}

async function acreedoresComercialesM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales) {

    const acreedoresComerciales = [
        balance.acreedoresComerciales,
        estrategiaCirculante.periodoMedioPagoUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365,
        estrategiaCirculante.periodoMedioPagoDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365,
        estrategiaCirculante.periodoMedioPagoTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365,
        estrategiaCirculante.periodoMedioPagoCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365,
        estrategiaCirculante.periodoMedioPagoCinco * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][4]) / 365,

    ]
    return acreedoresComerciales
}

async function otrosPasivosLiquidosM(req, res, balance, cuentaPerdidasGananciasPrevisionales) {

    const otrosPasivosLiquidos = [
        balance.otrosPasivosLiquidos,
        cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][0] / 100,
        cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][1] / 100,
        cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][2] / 100,
        cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][3] / 100,
        cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][4] / 100,
    ]
    return otrosPasivosLiquidos
}

balancesPrevisionalesController.getResultados = async (req, res) => {

    //Datos de entrada
    const balance = await getBalance(req, res);
    const politicaFinanciacion = await getPoliticaFinanciacion(req, res);
    const politicaInversion = await getPoliticaInversion(req, res);
    const estrategiaCirculante = await getEstrategiaCirculante(req, res);
    const cuentaPerdidasGananciasPrevisionales = await getCuentaPerdidasGananciasPrevisionales(req, res)

    //Calculadora
    const inmovilizadoInmaterial = await inmovilizadoInmaterialM(req, res, balance, politicaInversion)
    const inmovilizadoMaterial = await inmovilizadoMaterialM(req, res, balance, politicaInversion)
    const otrosActivosFijos = await otrosActivosFijosM(req, res, balance,)

    const existencias = await existenciasM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales)
    const deudores = await deudoresM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales)
    const otrosActivosLiquidos = await otrosActivosLiquidosM(req,res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    const capitalSuscrito = await capitalSuscritoM(req, res, balance, politicaFinanciacion)
    const otrosFondosPropios = await otrosFondosPropiosM(req, res, balance, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion)

    const deudaNueva = await deudaNuevaM(req, res, balance, politicaFinanciacion)
    const deudaAntigua = await deudaAntiguaM(req, res, balance, politicaFinanciacion)
    const provisiones = await provisionesM(req, res, balance)

    const deudasFinancieras = await deudasFinancierasM(req, res, balance)
    const acreedoresComerciales = await acreedoresComercialesM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales)
    const otrosPasivosLiquidos = await otrosPasivosLiquidosM(req, res, balance, cuentaPerdidasGananciasPrevisionales)

    const balancesPrevisionales = [
        inmovilizadoInmaterial,
        inmovilizadoMaterial,
        otrosActivosFijos,
        existencias,
        deudores,
        otrosActivosLiquidos,
        capitalSuscrito,
        otrosFondosPropios,
        deudaNueva,
        deudaAntigua,
        provisiones,
        deudasFinancieras,
        acreedoresComerciales,
        otrosPasivosLiquidos,
    ]
    
    res.json({
        balancesPrevisionales: balancesPrevisionales
    })

}

module.exports = balancesPrevisionalesController