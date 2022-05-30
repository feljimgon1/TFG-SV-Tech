const mongoose = require("mongoose");
const { Schema } = mongoose;

const balancesPrevisionalesSchema = new Schema(
  {
    
    //Situación

    balanceId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Balance',
        required: true,
        unique: true
      },

    //Previsionales
    inmovilizadoInmaterialUno: { type: Number, default: 0 },
    inmovilizadoInmaterialDos: { type: Number, default: 0 },
    inmovilizadoInmaterialTres: { type: Number, default: 0 },
    inmovilizadoInmaterialCuatro: { type: Number, default: 0 },
    inmovilizadoInmaterialCinco: { type: Number, default: 0 },

    inmovilizadoMaterialUno: { type: Number, default: 0 },
    inmovilizadoMaterialDos: { type: Number, default: 0 },
    inmovilizadoMaterialTres: { type: Number, default: 0 },
    inmovilizadoMaterialCuatro: { type: Number, default: 0 },
    inmovilizadoMaterialCinco: { type: Number, default: 0 },

    otrosActivosFijosUno: { type: Number, default: 0 },
    otrosActivosFijosDos: { type: Number, default: 0 },
    otrosActivosFijosTres: { type: Number, default: 0 },
    otrosActivosFijosCuatro: { type: Number, default: 0 },
    otrosActivosFijosCinco: { type: Number, default: 0 },

    existenciasUno: { type: Number, default: 0 },
    existenciasDos: { type: Number, default: 0 },
    existenciasTres: { type: Number, default: 0 },
    existenciasCuatro: { type: Number, default: 0 },
    existenciasCinco: { type: Number, default: 0 },

    deudoresUno: { type: Number, default: 0 },
    deudoresDos: { type: Number, default: 0 },
    deudoresTres: { type: Number, default: 0 },
    deudoresCuatro: { type: Number, default: 0 },
    deudoresCinco: { type: Number, default: 0 },

    otrosActivosLiquidosUno: { type: Number, default: 0 },
    otrosActivosLiquidosDos: { type: Number, default: 0 },
    otrosActivosLiquidosTres: { type: Number, default: 0 },
    otrosActivosLiquidosCuatro: { type: Number, default: 0 },
    otrosActivosLiquidosCinco: { type: Number, default: 0 },

    capitalSuscritoUno: { type: Number, default: 0 },
    capitalSuscritoDos: { type: Number, default: 0 },
    capitalSuscritoTres: { type: Number, default: 0 },
    capitalSuscritoCuatro: { type: Number, default: 0 },
    capitalSuscritoCinco: { type: Number, default: 0 },

    otrosFondosPropiosUno: { type: Number, default: 0 },
    otrosFondosPropiosDos: { type: Number, default: 0 },
    otrosFondosPropiosTres: { type: Number, default: 0 },
    otrosFondosPropiosCuatro: { type: Number, default: 0 },
    otrosFondosPropiosCinco: { type: Number, default: 0 },

    acreedoresLPUno: { type: Number, default: 0 },
    acreedoresLPDos: { type: Number, default: 0 },
    acreedoresLPTres: { type: Number, default: 0 },
    acreedoresLPCuatro: { type: Number, default: 0 },
    acreedoresLPCinco: { type: Number, default: 0 },
    
    otrosPasivosFijosUno: { type: Number, default: 0 },
    otrosPasivosFijosDos: { type: Number, default: 0 },
    otrosPasivosFijosTres: { type: Number, default: 0 },
    otrosPasivosFijosCuatro: { type: Number, default: 0 },
    otrosPasivosFijosCinco: { type: Number, default: 0 },

    provisionesUno: { type: Number, default: 0 },
    provisionesDos: { type: Number, default: 0 },
    provisionesTres: { type: Number, default: 0 },
    provisionesCuatro: { type: Number, default: 0 },
    provisionesCinco: { type: Number, default: 0 },
    
    deudasFinancierasUno: { type: Number, default: 0 },
    deudasFinancierasDos: { type: Number, default: 0 },
    deudasFinancierasTres: { type: Number, default: 0 },
    deudasFinancierasCuatro: { type: Number, default: 0 },
    deudasFinancierasCinco: { type: Number, default: 0 },

    acreedoresComercialesUno: { type: Number, default: 0 },
    acreedoresComercialesDos: { type: Number, default: 0 },
    acreedoresComercialesTres: { type: Number, default: 0 },
    acreedoresComercialesCuatro: { type: Number, default: 0 },
    acreedoresComercialesCinco: { type: Number, default: 0 },

    otrosPasivosLiquidosUno: { type: Number, default: 0 },
    otrosPasivosLiquidosDos: { type: Number, default: 0 },
    otrosPasivosLiquidosTres: { type: Number, default: 0 },
    otrosPasivosLiquidosCuatro: { type: Number, default: 0 },
    otrosPasivosLiquidosCinco: { type: Number, default: 0 },


    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true,
      unique: true
    },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("BalancesPrevisionales", balancesPrevisionalesSchema);