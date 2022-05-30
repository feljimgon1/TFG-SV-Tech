const paymentController = {};

const jwt = require("jsonwebtoken");
const config = require("../../config/database");
const User = require("../models/User");
const stripe = require('stripe')('sk_test_51IldEPBfL6JZfkGy63CwBki8V6n0aMYvSwcGzsZ9QEUabkH5mOjVhFWoT2tC0LZ4LCnrz9Cuc4iQl6m9s7kVpIu400kzW4urTD')


paymentController.charge = async (req,res)=>{

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, config.secret)
  req.user_id = payload._id
 
  const user = await User.findById(req.user_id)


  const stripeToken = req.body.tokenId;
  const amount = req.body.amount;

  const amountInEur = Math.round(amount*150000);
  const chargeObject = await stripe.charges.create({
    amount: amountInEur,
    currency: 'eur',
    source: stripeToken,
    capture: false,
    description: 'Pago del servicio',
    receipt_email: user.email
  })
  try{
    await stripe.charges.capture(chargeObject.id);
    await User.findByIdAndUpdate(req.user_id, {rol: 'PREMIUM'})
    res.json(chargeObject)
  }catch(error){
    await stripe.refunds.create({charge: chargeObject.id});
    res.json(chargeObject)
  }
}

module.exports = paymentController;