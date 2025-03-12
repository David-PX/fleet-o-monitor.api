const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const createCall = async (phoneNumber) => {
  try {
    const response = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log(`Llamada con SID: ${response.sid}`);

    return { success: true, sid: response.sid };
  } catch (error) {
    console.log(error);
    console.error('Error llamada con Twilio:', error.message);
    return { success: false, error: error.message };
  }
};

const createMessage = async (phoneNumber, message, forceDelivery = false) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      forceDelivery,
      provideFeedback: true,
      validityPeriod: 300,
      statusCallback:
        'https://c55c-2001-1308-2690-2e00-9c1d-f1c3-5ad6-77aa.ngrok-free.app/api/twilio/message-status',
    });

    console.log(`Mensaje enviado con SID: ${response.sid}`);

    return { success: true, sid: response.sid };
  } catch (error) {
    console.log(error);
    console.error('Error enviando mensaje con Twilio:', error.message);
    return { success: false, error: error.message };
  }
};

const getCarrier = async (phoneNumber) => {
  try {
    return client.lookups.v1.phoneNumbers(phoneNumber).fetch({ type: ['carrier'] });
  } catch (error) {
    console.error('Error:', error.message);
    return { error: error.message };
  }
};

module.exports = {
  createMessage,
  getCarrier,
  createCall,
};
