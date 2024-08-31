const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

dbMock.close = async () => {
  console.log('Simulating dbMock close...');
  return Promise.resolve();
};

module.exports = dbMock;
