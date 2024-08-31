const { DataTypes } = require('sequelize');

const { expect, jest } = require('@jest/globals');
const ShortenedUrl = require('./mocks/shortUrl');

describe('ShortenedUrl Model', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  test('should have the correct table name', () => {
    expect(ShortenedUrl.tableName).toBe('shortened_urls');
  });

  test('should define the correct attributes', () => {
    const expectedAttributes = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      original_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      click_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    };

    Object.keys(expectedAttributes).forEach(key => {
      const attribute = ShortenedUrl.getAttributes()[key];
      expect(attribute).toBeDefined();
      expect(attribute.type.key).toBe(expectedAttributes[key].type.key);
      expect(attribute.allowNull).toBe(expectedAttributes[key].allowNull);
      if (expectedAttributes[key].autoIncrement) {
        expect(attribute.autoIncrement).toBe(true);
      }
      if (expectedAttributes[key].primaryKey) {
        expect(attribute.primaryKey).toBe(true);
      }
      if (expectedAttributes[key].unique) {
        expect(attribute.unique).toBe(true);
      }
      if (expectedAttributes[key].defaultValue) {
        if (expectedAttributes[key].defaultValue === DataTypes.NOW) {
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
    expect(ShortenedUrl.options.timestamps).toBe(true);
  });

  test('should define the correct model name', () => {
    expect(ShortenedUrl.name).toBe('ShortenedUrl');
  });
});
