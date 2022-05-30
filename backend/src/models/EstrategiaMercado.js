const mongoose = require("mongoose");
const { Schema } = mongoose;

const estrategiaMercadoSchema = new Schema(
  {
    objetivoVentasAnyoCinco: { type: Number, default: 0 },

    ventasAlcanzadasUno: { type: Number, default: 0 },
    ventasAlcanzadasDos: { type: Number, default: 0 },
    ventasAlcanzadasTres: { type: Number, default: 0 },
    ventasAlcanzadasCuatro: { type: Number, default: 0 },
    ventasAlcanzadasCinco: { type: Number, default: 0 },

    numeroEmpleadosUno: { type: Number, default: 0 },
    numeroEmpleadosDos: { type: Number, default: 0 },
    numeroEmpleadosTres: { type: Number, default: 0 },
    numeroEmpleadosCuatro: { type: Number, default: 0 },
    numeroEmpleadosCinco: { type: Number, default: 0 },

    gastoEmpleadoUno: { type: Number, default: 0 },
    gastoEmpleadoDos: { type: Number, default: 0 },
    gastoEmpleadoTres: { type: Number, default: 0 },
    gastoEmpleadoCuatro: { type: Number, default: 0 },
    gastoEmpleadoCinco: { type: Number, default: 0 },

    aprovisionamientoPorVentasUno: { type: Number, default: 0 },
    aprovisionamientoPorVentasDos: { type: Number, default: 0 },
    aprovisionamientoPorVentasTres: { type: Number, default: 0 },
    aprovisionamientoPorVentasCuatro: { type: Number, default: 0 },
    aprovisionamientoPorVentasCinco: { type: Number, default: 0 },
    
    otrosGastosExplotacionPorVentasUno: { type: Number, default: 0 },
    otrosGastosExplotacionPorVentasDos: { type: Number, default: 0 },
    otrosGastosExplotacionPorVentasTres: { type: Number, default: 0 },
    otrosGastosExplotacionPorVentasCuatro: { type: Number, default: 0 },
    otrosGastosExplotacionPorVentasCinco: { type: Number, default: 0 },

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

module.exports = mongoose.model("EstrategiaMercado", estrategiaMercadoSchema);
