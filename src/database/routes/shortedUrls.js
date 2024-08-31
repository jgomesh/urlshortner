const express = require('express');
const ShortenedUrlController = require('../controllers/ShortenedUrlController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authFreeMiddleware = require('../middlewares/authSimpleMiddleware.js');
const validateUrl = require('../validations/urlValidation.js');

const router = express.Router();

router.post('/shorten', authFreeMiddleware, validateUrl, ShortenedUrlController.create);

router.get('/linksUsed', authFreeMiddleware, ShortenedUrlController.list);

router.put('/urls/:shortCode', authMiddleware, ShortenedUrlController.update);

router.delete('/urls/:shortCode', authMiddleware, ShortenedUrlController.delete);

router.get('/:shortCode', ShortenedUrlController.redirect);

module.exports = router;
