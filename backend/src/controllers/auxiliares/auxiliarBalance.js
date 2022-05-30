const cuentaPerdidasGananciasPrevisionalesController = {};

const jwt = require("jsonwebtoken");
const config = require("../../../config/database");

const Balance = require("../../models/Balance");
const EstrategiaMercado = require("../../models/EstrategiaMercado");
const CuentaPerdidasGanancias = require("../../models/CuentaPerdidasGanancias");
const PoliticaInversion = require("../../models/PoliticaInversion");
const PoliticaFinanciacion = require("../../models/PoliticaFinanciacion");
const EstrategiaCirculante = require("../../models/EstrategiaCirculante");

async function getCuentaPerdidasGanancias(req,res){
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const estrategiaMercado = await EstrategiaMercado.findOne({userId: req.user_id})
    return estrategiaMercado
}

async function getBalance(req,res){
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const balance = await Balance.findOne({userId: req.user_id})
    return balance
}

async function getPoliticaInversion(req,res){
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const politicaInversion = await PoliticaInversion.findOne({userId: req.user_id})
    return politicaInversion
}

async function getPoliticaFinanciacion(req,res){
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const politicaFinanciacion = await PoliticaFinanciacion.findOne({userId: req.user_id})
    return politicaFinanciacion
}

async function getEstrategiaCirculante(req,res){
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, config.secret);
    req.user_id = payload._id;
    const estrategiaCirculante = await EstrategiaCirculante.findOne({userId: req.user_id})
    return estrategiaCirculante
}

async function importeNetoCifraVentasM(req,res){
    const estrategiaMercado = await getCuentaPerdidasGanancias(req,res)

    const totalVentasEsperadas = estrategiaMercado.objetivoVentasAnyoCinco

    const importeNetoCifraVentas = [
        totalVentasEsperadas*(estrategiaMercado.ventasAlcanzadasUno/100),
        totalVentasEsperadas*(estrategiaMercado.ventasAlcanzadasDos/100),
        totalVentasEsperadas*(estrategiaMercado.ventasAlcanzadasTres/100),
        totalVentasEsperadas*(estrategiaMercado.ventasAlcanzadasCuatro/100),
        totalVentasEsperadas*(estrategiaMercado.ventasAlcanzadasCinco/100)
    ]

    return importeNetoCifraVentas

}

async function consumoMercaderiasMateriasM(req,res){

    const estrategiaMercado = await getCuentaPerdidasGanancias(req,res);   
    
    const importeNetoCifraVentas = await importeNetoCifraVentasM(req,res);

    const consumoMercaderiasMaterias = [

        importeNetoCifraVentas[0]*(estrategiaMercado.aprovisionamientoPorVentasUno/100),
        importeNetoCifraVentas[1]*(estrategiaMercado.aprovisionamientoPorVentasDos/100),
        importeNetoCifraVentas[2]*(estrategiaMercado.aprovisionamientoPorVentasTres/100),
        importeNetoCifraVentas[3]*(estrategiaMercado.aprovisionamientoPorVentasCuatro/100),
        importeNetoCifraVentas[4]*(estrategiaMercado.aprovisionamientoPorVentasCinco/100)

    ]

    return consumoMercaderiasMaterias

}

async function gastoPersonalM(req,res){

    const estrategiaMercado = await getCuentaPerdidasGanancias(req,res);   

    const gastoPersonal = [
        estrategiaMercado.gastoEmpleadoUno*estrategiaMercado.numeroEmpleadosUno, 
        estrategiaMercado.gastoEmpleadoDos*estrategiaMercado.numeroEmpleadosDos,
        estrategiaMercado.gastoEmpleadoTres*estrategiaMercado.numeroEmpleadosTres,
        estrategiaMercado.gastoEmpleadoCuatro*estrategiaMercado.numeroEmpleadosCuatro,
        estrategiaMercado.gastoEmpleadoCinco*estrategiaMercado.numeroEmpleadosCinco
    ]
    return gastoPersonal

}

async function otrosGastosExplotacionM(req,res){

    const estrategiaMercado = await getCuentaPerdidasGanancias(req,res);   

    const importeNetoCifraVentas = await importeNetoCifraVentasM(req,res);

    let otrosGastosExplotacion = []

    otrosGastosExplotacion.push((estrategiaMercado.otrosGastosExplotacionPorVentasUno/100)*importeNetoCifraVentas[0])
    otrosGastosExplotacion.push((estrategiaMercado.otrosGastosExplotacionPorVentasDos/100)*importeNetoCifraVentas[1])
    otrosGastosExplotacion.push((estrategiaMercado.otrosGastosExplotacionPorVentasTres/100)*importeNetoCifraVentas[2])
    otrosGastosExplotacion.push((estrategiaMercado.otrosGastosExplotacionPorVentasCuatro/100)*importeNetoCifraVentas[3])
    otrosGastosExplotacion.push((estrategiaMercado.otrosGastosExplotacionPorVentasCinco/100)*importeNetoCifraVentas[4])

    return otrosGastosExplotacion

}

async function EBITDA(req, res){

    const estrategiaMercado = await getCuentaPerdidasGanancias(req,res)

    const totalVentasEsperadas = estrategiaMercado.objetivoVentasAnyoCinco

    const importeNetoCifraVentas = await importeNetoCifraVentasM(req,res)

    const consumoMercaderiasMaterias = await consumoMercaderiasMateriasM(req,res);
    const gastoPersonal = await gastoPersonalM(req,res);
    const otrosGastosExplotacion = await otrosGastosExplotacionM(req,res);

    ebitda = []

    for(let i=0; i<5;i++){
        ebitda.push(importeNetoCifraVentas[i]-otrosGastosExplotacion[i]-gastoPersonal[i]-consumoMercaderiasMaterias[i])
    }

    return ebitda

}

async function CAT(req,res){//Hay que modificar la función para que cuadren las fórmulas
    const balance = await getBalance(req,res);   
    const politicaInversion = await getPoliticaInversion(req,res);

    a=(politicaInversion.inversionInmovilizadoInmaterialUno);
    b=(politicaInversion.vidaInmInmaterialUno);

    const cat = [
        (balance.inmovilizadoInmaterial/politicaInversion.vidaInmInmaterialUno) + (balance.inmovilizadoMaterial/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialUno/politicaInversion.vidaInmInmaterialUno) + (politicaInversion.inversionInmovilizadoMaterialUno/politicaInversion.vidaInmMaterialUno),
        (balance.inmovilizadoInmaterial/politicaInversion.vidaInmInmaterialUno) + (balance.inmovilizadoMaterial/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialUno/politicaInversion.vidaInmInmaterialUno) + (politicaInversion.inversionInmovilizadoMaterialUno/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialDos/politicaInversion.vidaInmInmaterialDos) + (politicaInversion.inversionInmovilizadoMaterialDos/politicaInversion.vidaInmMaterialDos),
        (balance.inmovilizadoInmaterial/politicaInversion.vidaInmInmaterialUno) + (balance.inmovilizadoMaterial/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialUno/politicaInversion.vidaInmInmaterialUno) + (politicaInversion.inversionInmovilizadoMaterialUno/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialDos/politicaInversion.vidaInmInmaterialDos) + (politicaInversion.inversionInmovilizadoMaterialDos/politicaInversion.vidaInmMaterialDos) + (politicaInversion.inversionInmovilizadoInmaterialTres/politicaInversion.vidaInmInmaterialTres) + (politicaInversion.inversionInmovilizadoMaterialTres/politicaInversion.vidaInmMaterialTres),
        (balance.inmovilizadoInmaterial/politicaInversion.vidaInmInmaterialUno) + (balance.inmovilizadoMaterial/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialUno/politicaInversion.vidaInmInmaterialUno) + (politicaInversion.inversionInmovilizadoMaterialUno/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialDos/politicaInversion.vidaInmInmaterialDos) + (politicaInversion.inversionInmovilizadoMaterialDos/politicaInversion.vidaInmMaterialDos) + (politicaInversion.inversionInmovilizadoInmaterialTres/politicaInversion.vidaInmInmaterialTres) + (politicaInversion.inversionInmovilizadoMaterialTres/politicaInversion.vidaInmMaterialTres) + (politicaInversion.inversionInmovilizadoInmaterialCuatro/politicaInversion.vidaInmInmaterialCuatro) + (politicaInversion.inversionInmovilizadoMaterialCuatro/politicaInversion.vidaInmMaterialCuatro),
        (balance.inmovilizadoInmaterial/politicaInversion.vidaInmInmaterialUno) + (balance.inmovilizadoMaterial/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialUno/politicaInversion.vidaInmInmaterialUno) + (politicaInversion.inversionInmovilizadoMaterialUno/politicaInversion.vidaInmMaterialUno) + (politicaInversion.inversionInmovilizadoInmaterialDos/politicaInversion.vidaInmInmaterialDos) + (politicaInversion.inversionInmovilizadoMaterialDos/politicaInversion.vidaInmMaterialDos) + (politicaInversion.inversionInmovilizadoInmaterialTres/politicaInversion.vidaInmInmaterialTres) + (politicaInversion.inversionInmovilizadoMaterialTres/politicaInversion.vidaInmMaterialTres) + (politicaInversion.inversionInmovilizadoInmaterialCuatro/politicaInversion.vidaInmInmaterialCuatro) + (politicaInversion.inversionInmovilizadoMaterialCuatro/politicaInversion.vidaInmMaterialCuatro) + (politicaInversion.inversionInmovilizadoInmaterialCinco/politicaInversion.vidaInmInmaterialCinco) + (politicaInversion.inversionInmovilizadoMaterialCinco/politicaInversion.vidaInmMaterialCinco),
    ]

    return cat

}

async function BAIT(req,res){

    const ebitda = await EBITDA(req,res)

    const cat = await CAT(req,res);

    let bait = []

    for(let i = 0; i<5;i++){
        if(!cat[i]){
            bait.push(ebitda[i])
        }
        else{
        bait.push(ebitda[i] - cat[i])
        }
    }

    return bait

}

async function gastosFinancierosM(req,res){//Necesitan datos generados a partir de los balances previksi
    const balance = await getBalance(req,res);
    const politicaFinanciacion = await getPoliticaFinanciacion(req, res);

    const gastosFinancieros = [
        (balance.otrosPasivosFijos*politicaFinanciacion.interesDeudaAntiguaUno)/100 + (politicaFinanciacion.deudaNuevaUno*politicaFinanciacion.interesDeudaNuevaUno)/100,
        (balance.otrosPasivosFijos-(balance.otrosPasivosFijos/politicaFinanciacion.vencimientoDeudaAntiguaUno))*(politicaFinanciacion.interesDeudaAntiguaUno/100)+(politicaFinanciacion.deudaNuevaUno-(politicaFinanciacion.deudaNuevaUno/politicaFinanciacion.vencimientoDeudaNuevaUno))*politicaFinanciacion.interesDeudaNuevaUno/100,
        (balance.otrosPasivosFijos-2*(balance.otrosPasivosFijos/politicaFinanciacion.vencimientoDeudaAntiguaUno))*(politicaFinanciacion.interesDeudaAntiguaUno/100) + (politicaFinanciacion.deudaNuevaUno-2*(politicaFinanciacion.deudaNuevaUno/politicaFinanciacion.vencimientoDeudaNuevaUno))*politicaFinanciacion.interesDeudaNuevaUno/100,
        (balance.otrosPasivosFijos-3*(balance.otrosPasivosFijos/politicaFinanciacion.vencimientoDeudaAntiguaUno))*(politicaFinanciacion.interesDeudaAntiguaUno/100) + (politicaFinanciacion.deudaNuevaUno-3*(politicaFinanciacion.deudaNuevaUno/politicaFinanciacion.vencimientoDeudaNuevaUno))*politicaFinanciacion.interesDeudaNuevaUno/100,
        (balance.otrosPasivosFijos-4*(balance.otrosPasivosFijos/politicaFinanciacion.vencimientoDeudaAntiguaUno))*(politicaFinanciacion.interesDeudaAntiguaUno/100) + (politicaFinanciacion.deudaNuevaUno-4*(politicaFinanciacion.deudaNuevaUno/politicaFinanciacion.vencimientoDeudaNuevaUno))*politicaFinanciacion.interesDeudaNuevaUno/100
    ]

    return gastosFinancieros

}

async function resultadosFinancierosM(req,res){
    const gastosFinancieros = await gastosFinancierosM(req,res)
    const resultadosFinancieros = [
        gastosFinancieros[0],
        gastosFinancieros[1],
        gastosFinancieros[2],
        gastosFinancieros[3],
        gastosFinancieros[4],
    ]
    return resultadosFinancieros
}

async function resultadosOrdinariosAntesImpuestosM(req,res){
    const resultadosFinancieros = await resultadosFinancierosM(req,res);
    const bait = await BAIT(req,res)

    const resultadosOrdinariosAntesImpuestos = [
        -resultadosFinancieros[0]+bait[0],
        -resultadosFinancieros[1]+bait[1],
        -resultadosFinancieros[2]+bait[2],
        -resultadosFinancieros[3]+bait[3],
        -resultadosFinancieros[4]+bait[4]
    ]

    return resultadosOrdinariosAntesImpuestos

}

async function impuestosSobreSociedadesM(req,res){
    const estrategiaCirculante = await getEstrategiaCirculante(req,res)
    const resultadosOrdinariosAntesImpuestos = await resultadosOrdinariosAntesImpuestosM(req,res)
    
    impuestosSobreSociedades = []

    for(let i = 0; i<5; i++){
        if(resultadosOrdinariosAntesImpuestos[i]>0){
            impuestosSobreSociedades[i] = resultadosOrdinariosAntesImpuestos[i]*estrategiaCirculante.tasaImpositiva
        }
        else{
            impuestosSobreSociedades[i] = 0
        }
    }

    return impuestosSobreSociedades
}

async function resultadoDelEjercicioM(req,res){
    const impuestosSobreSociedades = await impuestosSobreSociedadesM(req,res)
    const resultadosOrdinariosAntesImpuestos = await resultadosOrdinariosAntesImpuestosM(req,res)
    resultadoDelEjercicio = [
        resultadosOrdinariosAntesImpuestos[0]-impuestosSobreSociedades[0]/100,
        resultadosOrdinariosAntesImpuestos[1]-impuestosSobreSociedades[1]/100,
        resultadosOrdinariosAntesImpuestos[2]-impuestosSobreSociedades[2]/100,
        resultadosOrdinariosAntesImpuestos[3]-impuestosSobreSociedades[3]/100,
        resultadosOrdinariosAntesImpuestos[4]-impuestosSobreSociedades[4]/100,
    ]

    return resultadoDelEjercicio
}

async function autoFinanciacionM(req,res){

    const resultadoDelEjercicio = await resultadoDelEjercicioM(req,res)
    const cat = await CAT(req,res)
    
    const autoFinanciacion = [
        cat[0] + resultadoDelEjercicio[0],
        cat[1] + resultadoDelEjercicio[1],
        cat[2] + resultadoDelEjercicio[2],
        cat[3] + resultadoDelEjercicio[3],
        cat[4] + resultadoDelEjercicio[4],
    ]

    return autoFinanciacion

}

async function getResultados(req, res) {
    
    const importeNetoCifraVentas = await importeNetoCifraVentasM(req,res)
    const consumoMercaderiasMaterias = await consumoMercaderiasMateriasM(req,res)
    const gastoPersonal = await gastoPersonalM(req,res)
    const otrosGastosExplotacion = await otrosGastosExplotacionM(req,res)

    const ebitda = await EBITDA(req,res)
    const cat = await CAT(req,res)
    const bait = await BAIT(req, res)

    const gastosFinancieros = await gastosFinancierosM(req,res);

    const resultadosFinancieros = await resultadosFinancierosM(req,res);
    const resultadosOrdinariosAntesImpuestos = await resultadosOrdinariosAntesImpuestosM(req,res);

    const impuestosSobreSociedades = await impuestosSobreSociedadesM(req,res)

    const resultadoDelEjercicio = await resultadoDelEjercicioM(req,res)

    const autoFinanciacion = await autoFinanciacionM(req,res)

    //const cuentaPerdidasGananciasPrevisionales = await CuentaPerdidasGananciasPrevisionales.findOne({userId: req.user_id})

    const cuentaPerdidasGananciasPrevisionales = {
        importeNetoCifraVentas: importeNetoCifraVentas, 
        consumoMercaderiasMaterias:consumoMercaderiasMaterias,
        gastoPersonal: gastoPersonal,
        otrosGastosExplotacion:otrosGastosExplotacion,
        ebitda: ebitda,
        cat: cat,
        bait: bait,
        gastosFinancieros: gastosFinancieros,
        resultadosFinancieros: resultadosFinancieros,
        resultadosOrdinariosAntesImpuestos: resultadosOrdinariosAntesImpuestos,
        impuestosSobreSociedades: impuestosSobreSociedades,
        resultadoDelEjercicio: resultadoDelEjercicio,
        autoFinanciacion: autoFinanciacion
    }

    return {cuentaPerdidasGananciasPrevisionales: cuentaPerdidasGananciasPrevisionales}

  };


module.exports = getResultados