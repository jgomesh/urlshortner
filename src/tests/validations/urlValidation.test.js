const express = require('express');
const request = require('supertest');
const validateUrl = require('../../database/validations/urlValidation');

const app = express();
app.use(express.json());
app.post('/test-url', validateUrl, (req, res) => {
  res.status(200).json({ message: 'URL is valid' });
});

describe('URL Validation Middleware', () => {
  it('should return 200 for valid URLs', async () => {
    const response = await request(app)
      .post('/test-url')
      .send({ original_url: 'https://www.example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('URL is valid');
  });


  it('should return 400 for URLs that are too long', async () => {
    const longUrl = 'https://'.repeat(200) + 'example.com';
    const response = await request(app)
      .post('/test-url')
      .send({ original_url: longUrl });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid URL format or URL is too long');
  });

  it('should return 400 for invalid URL formats', async () => {
    const response = await request(app)
      .post('/test-url')
      .send({ original_url: 'invalid-url' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid URL format or URL is too long');
  });

  it('should return 400 for missing URL', async () => {
    const response = await request(app)
      .post('/test-url')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid URL format or URL is too long');
  });
});
