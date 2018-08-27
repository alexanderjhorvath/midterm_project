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
  
  if (stage == 1) {
    textContent.body = `You have a new order`;
  } else if (stage == 2) {
    textContent.body = `Thanks ${name}! Your order will be ready in ${time} minutes`;
  } else if (stage == 3) {
    textContent.body = `Your order is ready for pickup 🍔`;
  } else if (stage == 4) {
    textContent.body = `Thanks for shopping at Franklin's`;
  }

  client.messages.create(textContent)
    .then((message) => console.log(message.to))
}

exports.notification = notification;