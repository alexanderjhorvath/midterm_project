const twilioNumber = '7787672235';
const accountSid = 'AC027ae8e63ba27d259fac951146a90b13';
const authToken = '7e5c956f63391cce53337fe3f3f4fc56';
const client = require('twilio')(accountSid, authToken);
exports = module.exports;

function notification(name, number, stage, time){

  const textContent = {
    to: number,
    from: twilioNumber
  }
  
  textContent.body = `Thanks ${name}! Your order will be ready in ${time} minutes`;
  
  client.messages.create(textContent)
    .then((message) => console.log(message.to))
}

function noTimeNotification(name, number, stage){

  const textContent = {
    to: number,
    from: twilioNumber
  }

  if (stage == 1) {
    textContent.body = `You have a new order`;
  } else if (stage > 1 && stage < 3) {
    textContent.body = `Hi ${name}, your order is ready for pickup 🍔`;
  } else if (stage >= 3) {
    textContent.body = `Thanks for shopping at Franklins`;    
  }

  client.messages.create(textContent)
    .then((message) => console.log(message.to))
}

exports.notification = notification;
exports.noTimeNotification = noTimeNotification;