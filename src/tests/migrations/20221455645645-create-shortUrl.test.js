const { up, down } = require('../../database/migrations/20221455645645-create-shortUrl.cjs');
const sinon = require('sinon');
const { expect } = require('@jest/globals');

describe('Shortned Url Migration Tests', () => {
  let queryInterface;

  beforeEach(() => {
    queryInterface = {
      createTable: sinon.stub().resolves(),
      dropTable: sinon.stub().resolves(),
    };
  });

  it('up function should create shortened_urls table', async () => {
    await up(queryInterface);

    sinon.assert.calledWith(queryInterface.createTable, 'shortened_urls');

    const [, tableDefinition] = queryInterface.createTable.firstCall.args;

    const expectedTableDefinition = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: expect.anything(),
      },
      original_url: {
        type: expect.objectContaining({ key: 'STRING' }),
        allowNull: false,
      },
      short_code: {
        type: expect.objectContaining({ key: 'STRING', options: { length: 6 } }),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: expect.objectContaining({ key: 'INTEGER' }),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      click_count: {
        type: expect.objectContaining({ key: 'INTEGER' }),
        defaultValue: 0,
      },
      deleted_at: {
        type: expect.objectContaining({ key: 'DATE' }),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: expect.objectContaining({ key: 'DATE' }),
        defaultValue: expect.any(Function),
      },
      updatedAt: {
        allowNull: false,
        type: expect.objectContaining({ key: 'DATE' }),
        defaultValue: expect.any(Function),
      },
    };

    expect(tableDefinition).toMatchObject(expectedTableDefinition);
  });

  it('down function should drop shortened_urls table', async () => {
    await down(queryInterface);

    sinon.assert.calledOnceWithExactly(queryInterface.dropTable, 'shortened_urls');
  });
});
