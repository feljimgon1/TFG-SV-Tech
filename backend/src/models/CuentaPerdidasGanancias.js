const mongoose = require("mongoose");
const { Schema } = mongoose;

const cuentaPerdidasGananciasSchema = new Schema(
  {
    importeNetoCifraVentas: { type: Number, default: 0 },
    otrosIngresosExplotacion: { type: Number, default: 0 },
    trppi: { type: Number, default: 0 },
    consumoMercaderiasMaterias: { type: Number, default: 0 },
    gastoPersonal: { type: Number, default: 0 },
    otrosGastosExplotacion: { type: Number, default: 0 },
    cat: { type: Number, default: 0 },
    ingresosFinancieros: { type: Number, default: 0 },
    gastosFinancieros: { type: Number, default: 0 },

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

module.exports = mongoose.model("CuentaPerdidasGanancias", cuentaPerdidasGananciasSchema);