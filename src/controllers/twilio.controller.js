const { getIo } = require('../services/socket')
const { v4: uuidv4 } = require('uuid')

const webhook = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    console.log('userAgent', userAgent);
    if (!userAgent || !userAgent.includes('TwilioProxy')) {
      const latitude = req.body.latitude ?? -69.8941572163946
      const longitude = req.body.longitude ?? 18.502440213256392
      const io = getIo();
      io.emit("location", { latitude, longitude });
      return res.status(200).json({ ok: true, message: 'Message manually sent!', data: { id: uuidv4(), latitude, longitude } });
    }

    const { Body, From, To, MessageSid } = req.body;
    console.log(`Message received from: ${From} to: ${To} with MessageSid: ${MessageSid} and Body: '${Body}'`);

    const latMatch = Body.match(/lat:\s*([\d.-]+)/);
    const lonMatch = Body.match(/long:\s*([\d.-]+)/);

    if (latMatch && lonMatch) {
      const latitude = parseFloat(latMatch[1]);
      const longitude = parseFloat(lonMatch[1]);

      const io = getIo();
      io.emit("location", { latitude, longitude });
    }

    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>Recibido tu mensaje: ${Body}</Message></Response>`);
  } catch (error) {
    console.error("Error on weebhook: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const webhookException = async (req, res) => {
  try {
    console.log(req)
    res.status(200).json({ ok: true, message: 'success' });
  } catch (error) {
    console.error("Error on webhook exception: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  webhook,
  webhookException
};
