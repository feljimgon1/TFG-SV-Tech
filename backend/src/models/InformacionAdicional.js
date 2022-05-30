const mongoose = require("mongoose");
const { Schema } = mongoose;

const informacionAdicionalSchema = new Schema(
  {
    nombreEmpresa: { type: String, default: '' },
    palabrasClave: { type: String, default: '' },
    codigoCNAE: { type: String, default: '' },
    empresasCompetidoras: { type: String, default: '' },
    numeroEmpleadosActual: { type: Number, default: 0 },
    vidaEmpresa: { type: Number, default: 0 },

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

module.exports = mongoose.model("InformacionAdicional", informacionAdicionalSchema);