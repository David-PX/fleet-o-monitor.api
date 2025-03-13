const { GPSModel } = require('../models');

const seedGPSModels = async () => {
  try {
    const count = await GPSModel.count();
    if (count === 0) {
      console.log('🌱 Seeding GPS models...');
      await GPSModel.bulkCreate([
        {
          name: 'TK103A/B',
          stopCommand: 'stop123456',
          resumeCommand: 'resume123456',
          speedAlertCommand: 'speed123456 080',
          locationCommand: 'where123456',
          doorStatusCommand: 'doorstatus123456',
          lowBatteryMessage: 'low battery',
          powerOffMessage: 'power alarm',
          ignitionOnMessage: 'ACC alarm',
          ignitionOffMessage: 'ACC off',
          overSpeedMessage: 'speed alarm',
          doorStatusChangeMessage: 'door alarm',
        },
        {
          name: 'Concox GT06N',
          stopCommand: 'relay,1#',
          resumeCommand: 'relay,0#',
          speedAlertCommand: 'speed,080#',
          locationCommand: 'smslink#',
          doorStatusCommand: 'door,1#',
          lowBatteryMessage: 'battery low',
          powerOffMessage: 'power cut',
          ignitionOnMessage: 'ACC ON',
          ignitionOffMessage: 'ACC OFF',
          overSpeedMessage: 'speed warning',
          doorStatusChangeMessage: 'door open',
        },
      ]);
      console.log('✅ GPS models seeded successfully!');
    } else {
      console.log('✅ GPS models already exist, skipping seed.');
    }
  } catch (error) {
    console.error('❌ Error seeding GPS models:', error);
  }
};

module.exports = { seedGPSModels };
