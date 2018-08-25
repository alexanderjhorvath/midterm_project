const twilioNumber = '7787672235';
const accountSid = 'AC027ae8e63ba27d259fac951146a90b13';
const authToken = '7e5c956f63391cce53337fe3f3f4fc56';
const client = require('twilio')(accountSid, authToken);
exports = module.exports;

function notification(name, number, stage){

  const textContent = {
    to: number,
    from: twilioNumber
  }
  
  if (stage === 'placed') {
    textContent.body = `You have a new order`;
  } else if (stage === 'confirmed') {
    textContent.body = `Thanks ${name}! Your order has been confirmed! We will notify you when it's ready for pickup`;
  } else if (stage === 'ready') {
    textContent.body = `Your order is ready for pickup 🍔`;
  }

  client.messages.create(textContent)
    .then((message) => console.log(message.to))
}

exports.notification = notification;