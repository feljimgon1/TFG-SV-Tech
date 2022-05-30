const mongoose = require("mongoose");
const { Schema } = mongoose;

const politicaFinanciacionSchema = new Schema(
  {
    vencimientoDeudaAntiguaUno: { type: Number, default: 0 },
    vencimientoDeudaAntiguaDos: { type: Number, default: 0 },
    vencimientoDeudaAntiguaTres: { type: Number, default: 0 },
    vencimientoDeudaAntiguaCuatro: { type: Number, default: 0 },
    vencimientoDeudaAntiguaCinco: { type: Number, default: 0 },
    
    interesDeudaAntiguaUno: { type: Number, default: 0 },
    interesDeudaAntiguaDos: { type: Number, default: 0 },
    interesDeudaAntiguaTres: { type: Number, default: 0 },
    interesDeudaAntiguaCuatro: { type: Number, default: 0 },
    interesDeudaAntiguaCinco: { type: Number, default: 0 },
    
    deudaNuevaUno: { type: Number, default: 0 },
    deudaNuevaDos: { type: Number, default: 0 },
    deudaNuevaTres: { type: Number, default: 0 },
    deudaNuevaCuatro: { type: Number, default: 0 },
    deudaNuevaCinco: { type: Number, default: 0 },
    
    vencimientoDeudaNuevaUno: { type: Number, default: 0 },
    vencimientoDeudaNuevaDos: { type: Number, default: 0 },
    vencimientoDeudaNuevaTres: { type: Number, default: 0 },
    vencimientoDeudaNuevaCuatro: { type: Number, default: 0 },
    vencimientoDeudaNuevaCinco: { type: Number, default: 0 },

    interesDeudaNuevaUno: { type: Number, default: 0 },
    interesDeudaNuevaDos: { type: Number, default: 0 },
    interesDeudaNuevaTres: { type: Number, default: 0 },
    interesDeudaNuevaCuatro: { type: Number, default: 0 },
    interesDeudaNuevaCinco: { type: Number, default: 0 },

    ampliacionCapital: { type: Number, default: 0 },
    ampliacionCapitalDos: { type: Number, default: 0 },
    ampliacionCapitalTres: { type: Number, default: 0 },
    ampliacionCapitalCuatro: { type: Number, default: 0 },
    ampliacionCapitalCinco: { type: Number, default: 0 },
    
    primaEmision: { type: Number, default: 0 },
    primaEmisionDos: { type: Number, default: 0 },
    primaEmisionTres: { type: Number, default: 0 },
    primaEmisionCuatro: { type: Number, default: 0 },
    primaEmisionCinco: { type: Number, default: 0 },

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

module.exports = mongoose.model("PoliticaFinanciacionAdmin", politicaFinanciacionSchema);