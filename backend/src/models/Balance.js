const mongoose = require("mongoose");
const { Schema } = mongoose;

const balanceSchema = new Schema(
  {
    inmovilizadoInmaterial: { type: Number, default: 0 },
    inmovilizadoMaterial: { type: Number, default: 0 },
    otrosActivosFijos: { type: Number, default: 0 },
    existencias: { type: Number, default: 0 },
    deudores: { type: Number, default: 0 },
    otrosActivosLiquidos: { type: Number, default: 0 },
    capitalSuscrito: { type: Number, default: 0 },
    otrosFondosPropios: { type: Number, default: 0 },
    acreedoresLP: { type: Number, default: 0 },
    otrosPasivosFijos: { type: Number, default: 0 },
    provisiones: { type: Number, default: 0 },
    deudasFinancieras: { type: Number, default: 0 },
    acreedoresComerciales: { type: Number, default: 0 },
    otrosPasivosLiquidos: { type: Number, default: 0 },

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

module.exports = mongoose.model("Balance", balanceSchema);