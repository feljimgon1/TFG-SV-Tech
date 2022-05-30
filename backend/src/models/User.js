const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt-nodejs");

let validEmailCheck = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regExp.test(email);
  }
};

const emailValidators = [
  {
    validator: validEmailCheck,
    message: "El correo electrónico proporcionado no es válido.",
  },
];

let passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  } else {
    if (password.length < 8 || password.length > 25) {
      return false;
    }
  }
};

let validPassword = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    return regExp.test(password);
  }
};

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: "La contraseña debe tener entre 8 y 25 caracteres.",
  },
  {
    validator: validPassword,
    message:
      "La contraseña debe tener una minúscula, una mayúscula, un carácter especial y un número.",
  },
];

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: emailValidators,
    },
    password: { type: String, required: true, validate: passwordValidators },
    balanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Balance",
      unique: true,
      sparse: true,
      default: null,
    },
    cuentaPerdidasGananciasId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuentaPerdidasGanancias",
      unique: true,
      sparse: true,
      default: null,
    },

    estrategiaCirculanteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EstrategiaCirculante",
      unique: true,
      sparse: true,
      default: null,
    },

    estrategiaMercadoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EstrategiaMercado",
      unique: true,
      sparse: true,
      default: null,
    },

    politicaFinanciacionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliticaFinanciacion",
      unique: true,
      sparse: true,
      default: null,
    },

    politicaInversionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliticaInversion",
      unique: true,
      sparse: true,
      default: null,
    },

    informacionAdicionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InformacionAdicional",
      unique: true,
      sparse: true,
      default: null,
    },

    cuentaPerdidasGananciasPrevisionalesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuentaPerdidasGananciasPrevisionales",
      unique: true,
      sparse: true,
      default: null,
    },

    rol: {
      type: String,
      enum: ["USER", "ADMIN", "BASICO", "MEDIUM", "PREMIUM"],
      default: 'USER'
    },

    //Plan del Admin

    balanceAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Balance",
      unique: true,
      sparse: true,
      default: null,
    },
    cuentaPerdidasGananciasAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuentaPerdidasGanancias",
      unique: true,
      sparse: true,
      default: null,
    },

    estrategiaCirculanteAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EstrategiaCirculante",
      unique: true,
      sparse: true,
      default: null,
    },

    estrategiaMercadoAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EstrategiaMercado",
      unique: true,
      sparse: true,
      default: null,
    },

    politicaFinanciacionAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliticaFinanciacion",
      unique: true,
      sparse: true,
      default: null,
    },

    politicaInversionAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliticaInversion",
      unique: true,
      sparse: true,
      default: null,
    },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
