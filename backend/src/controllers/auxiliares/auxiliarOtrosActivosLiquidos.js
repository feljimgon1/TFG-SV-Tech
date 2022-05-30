const jwt = require("jsonwebtoken");
const config = require("../../../config/database");

async function otrosActivosLiquidosUno(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][0]
    let prestamos = politicaFinanciacion.deudaNuevaUno
    let capitalSocial = (1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital
    let primaEmision = politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoMaterialUno
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) + (politicaFinanciacion.deudaNuevaDos / politicaFinanciacion.vencimientoDeudaAntiguaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroUno * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][0] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otUno

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][0] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = (balance.deudores + balance.existencias + balance.otrosActivosLiquidos) - (balance.deudasFinancieras + balance.acreedoresComerciales + balance.otrosPasivosLiquidos)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let oALUno = estrategiaCirculante.otUno + necesidadesFondos

    return oALUno
}

async function ccUno(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][0]
    let prestamos = politicaFinanciacion.deudaNuevaUno
    let capitalSocial = (1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital
    let primaEmision = politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoMaterialUno
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) + (politicaFinanciacion.deudaNuevaDos / politicaFinanciacion.vencimientoDeudaAntiguaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroUno * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][0] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otUno

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][0] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    return cc2
}

async function necesidadesFondosUnoM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][0]
    let prestamos = politicaFinanciacion.deudaNuevaUno
    let capitalSocial = (1 - politicaFinanciacion.primaEmision / 100) * politicaFinanciacion.ampliacionCapital
    let primaEmision = politicaFinanciacion.primaEmision / 100 * politicaFinanciacion.ampliacionCapital

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialUno + politicaInversion.inversionInmovilizadoMaterialUno
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaUno) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaUno) + (politicaFinanciacion.deudaNuevaDos / politicaFinanciacion.vencimientoDeudaAntiguaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroUno * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][0] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otUno

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoUno * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][0] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][0]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][0] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = (balance.deudores + balance.existencias + balance.otrosActivosLiquidos) - (balance.deudasFinancieras + balance.acreedoresComerciales + balance.otrosPasivosLiquidos)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    return necesidadesFondos
}

async function otrosActivosLiquidosDos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][1]
    let prestamos = politicaFinanciacion.deudaNuevaDos
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionDos / 100) * politicaFinanciacion.ampliacionCapitalDos
    let primaEmision = politicaFinanciacion.primaEmisionDos / 100 * politicaFinanciacion.ampliacionCapitalDos

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialDos + politicaInversion.inversionInmovilizadoMaterialDos
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroDos * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][1] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otDos

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][1] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccUno(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)
    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosUno = await necesidadesFondosUnoM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosUno

    let oALUno = estrategiaCirculante.otDos + resultadoPC

    return oALUno
}

async function necesidadesFondosDosM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][1]
    let prestamos = politicaFinanciacion.deudaNuevaDos
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionDos / 100) * politicaFinanciacion.ampliacionCapitalDos
    let primaEmision = politicaFinanciacion.primaEmisionDos / 100 * politicaFinanciacion.ampliacionCapitalDos

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialDos + politicaInversion.inversionInmovilizadoMaterialDos
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroDos * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][1] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otDos

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][1] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccUno(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosUno = await necesidadesFondosUnoM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosUno

    return resultadoPC
}

async function ccDos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][1]
    let prestamos = politicaFinanciacion.deudaNuevaDos
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionDos / 100) * politicaFinanciacion.ampliacionCapitalDos
    let primaEmision = politicaFinanciacion.primaEmisionDos / 100 * politicaFinanciacion.ampliacionCapitalDos

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialDos + politicaInversion.inversionInmovilizadoMaterialDos
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaDos) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaDos)

    let existencias = estrategiaCirculante.periodoMedioExistenciaDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroDos * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][1] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otDos

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoDos * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][1] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][1]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][1] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente
    return cc2
}

async function otrosActivosLiquidosTres(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][2]
    let prestamos = politicaFinanciacion.deudaNuevaTres
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionTres / 100) * politicaFinanciacion.ampliacionCapitalTres
    let primaEmision = politicaFinanciacion.primaEmisionTres / 100 * politicaFinanciacion.ampliacionCapitalTres

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialTres + politicaInversion.inversionInmovilizadoMaterialTres
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres)

    let existencias = estrategiaCirculante.periodoMedioExistenciaTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroTres * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][2] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otTres

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][2] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccDos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosDos = await necesidadesFondosDosM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosDos

    let oALUno = estrategiaCirculante.otTres + resultadoPC

    return oALUno
}

//Año 4

async function necesidadesFondosTresM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][2]
    let prestamos = politicaFinanciacion.deudaNuevaTres
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionTres / 100) * politicaFinanciacion.ampliacionCapitalTres
    let primaEmision = politicaFinanciacion.primaEmisionTres / 100 * politicaFinanciacion.ampliacionCapitalTres

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialTres + politicaInversion.inversionInmovilizadoMaterialTres
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres)

    let existencias = estrategiaCirculante.periodoMedioExistenciaTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroTres * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][2] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otTres

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][2] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccDos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosDos = await necesidadesFondosDosM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosDos

    return resultadoPC
}

async function ccTres(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][2]
    let prestamos = politicaFinanciacion.deudaNuevaTres
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionTres / 100) * politicaFinanciacion.ampliacionCapitalTres
    let primaEmision = politicaFinanciacion.primaEmisionTres / 100 * politicaFinanciacion.ampliacionCapitalTres

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialTres + politicaInversion.inversionInmovilizadoMaterialTres
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaTres) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaTres)

    let existencias = estrategiaCirculante.periodoMedioExistenciaTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroTres * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][2] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otTres

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoTres * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][2] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][2]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][2] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente
    return cc2
}

async function otrosActivosLiquidosCuatro(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][3]
    let prestamos = politicaFinanciacion.deudaNuevaCuatro
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionCuatro / 100) * politicaFinanciacion.ampliacionCapitalCuatro
    let primaEmision = politicaFinanciacion.primaEmisionCuatro / 100 * politicaFinanciacion.ampliacionCapitalCuatro

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoMaterialCuatro
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCuatro) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaCuatro)

    let existencias = estrategiaCirculante.periodoMedioExistenciaCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroCuatro * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][3] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otCuatro

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][3] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccTres(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosTres = await necesidadesFondosTresM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosTres

    let oALCuatro = estrategiaCirculante.otCuatro + resultadoPC

    return oALCuatro
}

//Año 5

async function necesidadesFondosCuatroM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][3]
    let prestamos = politicaFinanciacion.deudaNuevaCuatro
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionCuatro / 100) * politicaFinanciacion.ampliacionCapitalCuatro
    let primaEmision = politicaFinanciacion.primaEmisionCuatro / 100 * politicaFinanciacion.ampliacionCapitalCuatro

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoMaterialCuatro
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCuatro) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaCuatro)

    let existencias = estrategiaCirculante.periodoMedioExistenciaCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroCuatro * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][3] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otCuatro

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][3] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccTres(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosTres = await necesidadesFondosTresM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosTres

    return resultadoPC
}

async function ccCuatro(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][3]
    let prestamos = politicaFinanciacion.deudaNuevaCuatro
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionCuatro / 100) * politicaFinanciacion.ampliacionCapitalCuatro
    let primaEmision = politicaFinanciacion.primaEmisionCuatro / 100 * politicaFinanciacion.ampliacionCapitalCuatro

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialCuatro + politicaInversion.inversionInmovilizadoMaterialCuatro
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCuatro) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaCuatro)

    let existencias = estrategiaCirculante.periodoMedioExistenciaCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroCuatro * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][3] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otCuatro

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoCuatro * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][3] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][3]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][3] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    return cc2
}

async function otrosActivosLiquidosCinco(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let autoFinanciacion = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["autoFinanciacion"][4]
    let prestamos = politicaFinanciacion.deudaNuevaCinco
    let capitalSocial = (1 - politicaFinanciacion.primaEmisionCinco / 100) * politicaFinanciacion.ampliacionCapitalCinco
    let primaEmision = politicaFinanciacion.primaEmisionCinco / 100 * politicaFinanciacion.ampliacionCapitalCinco

    let totalOrigenes = autoFinanciacion + prestamos + capitalSocial + primaEmision

    let inversionInmovilizado = politicaInversion.inversionInmovilizadoInmaterialCinco + politicaInversion.inversionInmovilizadoMaterialCinco
    let devolucionDeuda = (balance.otrosPasivosFijos / politicaFinanciacion.vencimientoDeudaAntiguaCinco) + (politicaFinanciacion.deudaNuevaUno / politicaFinanciacion.vencimientoDeudaNuevaCinco)

    let existencias = estrategiaCirculante.periodoMedioExistenciaCinco * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][4]) / 365
    let deudores = estrategiaCirculante.periodoMedioCobroCinco * cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["importeNetoCifraVentas"][4] / 365
    let otrosActivosLiquidosV = estrategiaCirculante.otCinco

    let activoCorriente = existencias + deudores + otrosActivosLiquidosV

    let deudasFinancieras = balance.deudasFinancieras
    let acreedoresComerciales = estrategiaCirculante.periodoMedioPagoCinco * (cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["consumoMercaderiasMaterias"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["gastoPersonal"][4] + cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["otrosGastosExplotacion"][4]) / 365
    let otrosPasivosLiquidosVV = cuentaPerdidasGananciasPrevisionales.cuentaPerdidasGananciasPrevisionales["impuestosSobreSociedades"][4] / 100

    let pasivoCorriente = deudasFinancieras + acreedoresComerciales + otrosPasivosLiquidosVV

    let cc2 = activoCorriente - pasivoCorriente

    let cc1 = await ccCuatro(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let fondoManiobra = cc2 - cc1

    let totalNecesidades = fondoManiobra + inversionInmovilizado + devolucionDeuda

    let necesidadesFondos = totalOrigenes - totalNecesidades

    let necesidadesFondosCuatro = await necesidadesFondosCuatroM(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let resultadoPC = necesidadesFondos + necesidadesFondosCuatro

    let oALCinco = estrategiaCirculante.otCinco + resultadoPC

    return oALCinco
}

async function otrosActivosLiquidos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion) {

    let oALUno = await otrosActivosLiquidosUno(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)
    let oALDos = await otrosActivosLiquidosDos(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)
    let oALTres = await otrosActivosLiquidosTres(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)
    let oALCuatro = await otrosActivosLiquidosCuatro(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)
    let oALCinco = await otrosActivosLiquidosCinco(req, res, balance, estrategiaCirculante, cuentaPerdidasGananciasPrevisionales, politicaFinanciacion, politicaInversion)

    let l = [
        oALUno,
        oALDos,
        oALTres,
        oALCuatro,
        oALCinco
    ]

    return l

}

module.exports = otrosActivosLiquidos