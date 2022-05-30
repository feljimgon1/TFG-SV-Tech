const express = require('express');

const stripe = require('stripe')('sk_test_51IldEPBfL6JZfkGy63CwBki8V6n0aMYvSwcGzsZ9QEUabkH5mOjVhFWoT2tC0LZ4LCnrz9Cuc4iQl6m9s7kVpIu400kzW4urTD')

const morgan = require('morgan');
const cors = require('cors');

const app = express();

const path = require('path')

const http = require('http').createServer(app)

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/payment", require('./routes/payment.routes'))
app.use("/api/info-adicional", require('./routes/informacionAdicional.routes'))

app.use("/api/users", require('./routes/user.routes'));
app.use("/api/admin", require('./routes/admin.routes'));
app.use("/api/profile", require('./routes/profile.routes'));
app.use("/api/register", require('./routes/register.routes'));
app.use("/api/login", require('./routes/login.routes'));

app.use("/api/balance", require('./routes/balance.routes'));
app.use("/api/cuenta-perdidas-ganancias", require('./routes/cuentaPerdidasGanancias.routes'));

app.use("/api/estrategia-mercado", require('./routes/estrategiaMercado.routes'));
app.use("/api/politica-inversion", require('./routes/politicaInversion.routes'));
app.use("/api/politica-financiacion", require('./routes/politicaFinanciacion.routes'));
app.use("/api/estrategia-circulante", require('./routes/estrategiaCirculante.routes'));

app.use("/api/cuenta-perdidas-ganancias-previsionales", require('./routes/resultados/cuentaPerdidasGananciasPrevisionales.routes'));
app.use("/api/balances-previsionales", require('./routes/resultados/balancesPrevisionales.routes'));

app.use("/api/messages", require('./routes/message.routes'));

app.use("/api/planPersonalizado", require('./routes/plan-personalizado.routes'));

app.use(express.static(path.join(__dirname, '../backend_src/public')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../backend_src/public/index.html'))
})

module.exports = app;