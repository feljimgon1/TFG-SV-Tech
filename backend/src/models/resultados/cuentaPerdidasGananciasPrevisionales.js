const mongoose = require("mongoose");
const { Schema } = mongoose;

const cuentaPerdidasGananciasPrevisionalesSchema = new Schema(
  {

    importeNetoCifraVentas: { type: [Number], default: 0 },
    consumoMercaderiasMaterias: { type: [Number], default: 0 },
    gastoPersonal: { type: [Number], default: 0 },
    otrosGastosExplotacion: { type: [Number], default: 0 },
    ebitda: { type: [Number], default: 0 },
    cat: { type: [Number], default: 0 },
    bait: { type: [Number], default: 0 },
    gastosFinancieros: { type: [Number], default: 0 },
    resultadosFinancieros: { type: [Number], default: 0 },
    resultadosOrdinariosAntesImpuestos: { type: [Number], default: 0 },
    impuestosSobreSociedades: { type: [Number], default: 0 },
    resultadoEjercicio: { type: [Number], default: 0 },
    autoFinanciacion: { type: [Number], default: 0 },

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

module.exports = mongoose.model("CuentaPerdidasGananciasPrevisionales", cuentaPerdidasGananciasPrevisionalesSchema);