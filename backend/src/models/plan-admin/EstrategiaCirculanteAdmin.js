const mongoose = require("mongoose");
const { Schema } = mongoose;

const estrategiaCirculanteSchema = new Schema(
  {
    periodoMedioCobroUno: { type: Number, default: 0 },
    periodoMedioCobroDos: { type: Number, default: 0 },
    periodoMedioCobroTres: { type: Number, default: 0 },
    periodoMedioCobroCuatro: { type: Number, default: 0 },
    periodoMedioCobroCinco: { type: Number, default: 0 },
    
    periodoMedioExistenciaUno: { type: Number, default: 0 },
    periodoMedioExistenciaDos: { type: Number, default: 0 },
    periodoMedioExistenciaTres: { type: Number, default: 0 },
    periodoMedioExistenciaCuatro: { type: Number, default: 0 },
    periodoMedioExistenciaCinco: { type: Number, default: 0 },
    
    periodoMedioPagoUno: { type: Number, default: 0 },
    periodoMedioPagoDos: { type: Number, default: 0 },
    periodoMedioPagoTres: { type: Number, default: 0 },
    periodoMedioPagoCuatro: { type: Number, default: 0 },
    periodoMedioPagoCinco: { type: Number, default: 0 },

    otUno: { type: Number, default: 0 },
    otDos: { type: Number, default: 0 },
    otTres: { type: Number, default: 0 },
    otCuatro: { type: Number, default: 0 },
    otCinco: { type: Number, default: 0 },

    interesPolizaCreditoUno: { type: Number, default: 0 },
    interesPolizaCreditoDos: { type: Number, default: 0 },
    interesPolizaCreditoTres: { type: Number, default: 0 },
    interesPolizaCreditoCuatro: { type: Number, default: 0 },
    interesPolizaCreditoCinco: { type: Number, default: 0 },

    polizaCreditoUno: { type: Number, default: 0 },
    polizaCreditoDos: { type: Number, default: 0 },
    polizaCreditoTres: { type: Number, default: 0 },
    polizaCreditoCuatro: { type: Number, default: 0 },
    polizaCreditoCinco: { type: Number, default: 0 },

    tasaImpositiva: {type: Number, default: 0},

    
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

module.exports = mongoose.model("EstrategiaCirculanteAdmin", estrategiaCirculanteSchema);