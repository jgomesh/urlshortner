const dbMock = require('../config/mocks/sequelize');
const { expect, jest } = require('@jest/globals');
const Click = require('./mocks/click');
const { DataTypes } = require('sequelize');

describe('Click Model', () => {
  let sequelizeCloseSpy;

  beforeAll(() => {
    console.error = jest.fn();

    sequelizeCloseSpy = jest.spyOn(Click.sequelize, 'close').mockImplementation(async () => {
    });
  });

  afterAll(async () => {
    await dbMock.close();
    sequelizeCloseSpy.mockRestore();
  });

  afterEach(() => {
    sequelizeCloseSpy.mockClear();
  });

  test('should have the correct table name', () => {
    expect(Click.tableName).toBe('clicks');
  });

  test('should define the correct attributes', () => {
    const expectedAttributes = {
      shortened_url_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'shortened_urls',
          key: 'id',
        },
      },
      clicked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    };

    Object.keys(expectedAttributes).forEach(key => {
      const attribute = Click.getAttributes()[key];
      expect(attribute).toBeDefined();
      expect(attribute.type.key).toBe(expectedAttributes[key].type.key);
      expect(attribute.allowNull).toBe(expectedAttributes[key].allowNull);

      if (expectedAttributes[key].defaultValue) {
        if (expectedAttributes[key].defaultValue === DataTypes.NOW) {
          expect(attribute.defaultValue).toBeDefined();
          expect(attribute.defaultValue.toString()).toBe(DataTypes.NOW.toString());
        } else {
          expect(attribute.defaultValue).toEqual(expectedAttributes[key].defaultValue);
        }
      }

      if (expectedAttributes[key].references) {
        expect(attribute.references).toEqual(expectedAttributes[key].references);
      }
    });
  });

  test('should have timestamps enabled', () => {
    expect(Click.options.timestamps).toBe(true);
  });

  test('should define the correct model name', () => {
    expect(Click.name).toBe('Click');
  });
});
