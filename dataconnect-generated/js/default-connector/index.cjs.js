const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Test_admin',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

