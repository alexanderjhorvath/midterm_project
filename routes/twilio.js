const twilioNumber = '7787672235';
const accountSid = 'AC027ae8e63ba27d259fac951146a90b13';
const authToken = '7e5c956f63391cce53337fe3f3f4fc56';
const client = require('twilio')(accountSid, authToken);

function sendText(){
  const phoneNumber = '7786971129';
  
  const textContent = {
    body: `You got twilio working you absolute legend`,
    to: phoneNumber,
    from: twilioNumber
}
  client.messages.create(textContent)
    .then((message) => console.log(message.to))
}


sendText();