const mongoose = require("mongoose");
const { Schema } = mongoose;

const politicaInversionSchema = new Schema(
  {
    inversionInmovilizadoInmaterialUno: { type: Number, default: 0 },
    inversionInmovilizadoInmaterialDos: { type: Number, default: 0 },
    inversionInmovilizadoInmaterialTres: { type: Number, default: 0 },
    inversionInmovilizadoInmaterialCuatro: { type: Number, default: 0 },
    inversionInmovilizadoInmaterialCinco: { type: Number, default: 0 },

    activacionConocimientoUno: { type: Number, default: 0 },
    activacionConocimientoDos: { type: Number, default: 0 },
    activacionConocimientoTres: { type: Number, default: 0 },
    activacionConocimientoCuatro: { type: Number, default: 0 },
    activacionConocimientoCinco: { type: Number, default: 0 },

    inversionInmovilizadoMaterialUno: { type: Number, default: 0 },
    inversionInmovilizadoMaterialDos: { type: Number, default: 0 },
    inversionInmovilizadoMaterialTres: { type: Number, default: 0 },
    inversionInmovilizadoMaterialCuatro: { type: Number, default: 0 },
    inversionInmovilizadoMaterialCinco: { type: Number, default: 0 },

    inversionInmovilizadoMaterialSecundarioUno: { type: Number, default: 0 },
    inversionInmovilizadoMaterialSecundarioDos: { type: Number, default: 0 },
    inversionInmovilizadoMaterialSecundarioTres: { type: Number, default: 0 },
    inversionInmovilizadoMaterialSecundarioCuatro: { type: Number, default: 0 },
    inversionInmovilizadoMaterialSecundarioCinco: { type: Number, default: 0 },

    vidaInmMaterialUno: { type: Number, default: 0 },
    vidaInmMaterialDos: { type: Number, default: 0 },
    vidaInmMaterialTres: { type: Number, default: 0 },
    vidaInmMaterialCuatro: { type: Number, default: 0 },
    vidaInmMaterialCinco: { type: Number, default: 0 },

    vidaInmInmaterialUno: { type: Number, default: 0 },
    vidaInmInmaterialDos: { type: Number, default: 0 },
    vidaInmInmaterialTres: { type: Number, default: 0 },
    vidaInmInmaterialCuatro: { type: Number, default: 0 },
    vidaInmInmaterialCinco: { type: Number, default: 0 },

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

module.exports = mongoose.model("PoliticaInversion", politicaInversionSchema);