const express = require('express');
const router = express.Router();
const app = express();
const port = process.env.PORT || 8280;

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
router.post('/payment', (req, res) => {
  const stripeToken = req.body.stripeToken;

  const charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, (err, charge) => {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log('declined');
    } else {
      console.log('charge was ', charge);
    }
  });
});

app.listen(port);

console.log('Listening on port ', port);

module.exports = app;
