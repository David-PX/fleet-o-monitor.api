const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const createMessage = async (gpsNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: gpsNumber,
    });

    console.log(`Mensaje enviado con SID: ${response.sid}`);

    return {success: true, sid: response.id};
  } catch (error) {
    console.error("Error enviando mensaje con Twilio:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = createMessage;
