const { up, down } = require('../../database/migrations/20221201132752-create-user.cjs');
const sinon = require('sinon');
const { expect } = require('@jest/globals');

describe('User Migration Tests', () => {
  let queryInterface;

  beforeEach(() => {
    queryInterface = {
      createTable: sinon.stub().resolves(),
      dropTable: sinon.stub().resolves(),
    };
  });

  it('up function should create users table', async () => {
    await up(queryInterface);

    expect(queryInterface.createTable.calledOnce).toBe(true);

    const [, tableDefinition] = queryInterface.createTable.firstCall.args;

    expect(tableDefinition).toMatchObject({
      id: {
        primaryKey: true,
        type: expect.any(Function),
        autoIncrement: true,
      },
      email: {
        type: expect.any(Function),
      },
      password: {
        type: expect.any(Function),
      },
      name: {
        type: expect.any(Function),
      },
      role: {
        type: expect.any(Function),
      },
    });
  });

  it('down function should drop users table', async () => {
    await down(queryInterface);

    expect(queryInterface.dropTable.calledOnceWithExactly('users')).toBe(true);
  });
});
