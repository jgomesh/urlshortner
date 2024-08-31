const express = require('express');
const request = require('supertest');
const validateUser = require('../../database/validations/userValidation');

const app = express();
app.use(express.json());
app.post('/test', validateUser, (req, res) => res.status(200).send('Valid user'));

describe('validateUser Middleware', () => {
  it('should call next() for valid user data ', async () => {
    const response = await request(app)
      .post('/test')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Valid user');
  });

  it('should return 400 for invalid user data', async () => {
    const response = await request(app)
      .post('/test')
      .send({
        name: 'JD',
        email: 'not-an-email',
        password: 'short'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      '"name" length must be at least 3 characters long',
      '"email" must be a valid email',
      '"password" length must be at least 6 characters long'
    ]);
  });
});
