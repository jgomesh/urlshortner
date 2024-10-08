const crypto = require('crypto');
const ShortenedUrl = require('../models/shortenedUrl.js');
const Click = require('../models/click.js');
const User = require('../models/user.js');
const sequelize = require('../instances/sequelize.js')
const generateShortCode = (length = 6) => {
  return crypto.randomBytes(length).toString('base64').slice(0, length).replace(/\+/g, '0').replace(/\//g, '0');
};

const ensureProtocol = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

class ShortenedUrlController {
  async create(req, res) {
    const { original_url } = req.body;
    const userId = req.userId || null;
    const originalUrlWithProtocol = ensureProtocol(original_url);
  
    try {
      if (userId === null) {
        let shortCode;
        let existingUrl;
        do {
          shortCode = generateShortCode(6);
          existingUrl = await ShortenedUrl.findOne({ where: { short_code: shortCode } });
        } while (existingUrl);
  
        const newUrl = await ShortenedUrl.create({
          original_url: originalUrlWithProtocol,
          short_code: shortCode,
          user_id: userId,
          click_count: 0
        });
  
        return res.status(201).json({ shortUrl: `https://urlshortner-1-7rst.onrender.com/${newUrl.short_code}` });
      }
  
      const userExists = await User.findOne({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      // Check if the URL exists and has been marked as deleted
      const existingUrlForUser = await ShortenedUrl.findOne({
        where: {
          original_url: originalUrlWithProtocol,
          user_id: userId,
        },
      });
  
      if (existingUrlForUser) {
        if (existingUrlForUser.deleted_at !== null) {
          // URL exists but was marked as deleted; update it
          existingUrlForUser.deleted_at = null;
          await existingUrlForUser.save();
          return res.status(200).json({ shortUrl: `https://urlshortner-1-7rst.onrender.com/${existingUrlForUser.short_code}` });
        } else {
          // URL exists and is not deleted
          return res.status(200).json({ shortUrl: `https://urlshortner-1-7rst.onrender.com/${existingUrlForUser.short_code}` });
        }
      }
  
      let shortCode;
      let existingUrl;
      do {
        shortCode = generateShortCode(6);
        existingUrl = await ShortenedUrl.findOne({ where: { short_code: shortCode } });
      } while (existingUrl);
  
      const newUrl = await ShortenedUrl.create({
        original_url: originalUrlWithProtocol,
        short_code: shortCode,
        user_id: userId,
      });
  
      return res.status(201).json({ shortUrl: `https://urlshortner-1-7rst.onrender.com/${newUrl.short_code}` });
    } catch (error) {
      console.error('Error creating shortened URL:', error);
      return res.status(500).json({ message: 'Failed to create URL' });
    }
  }
  
  async redirect(req, res) {
    const { shortCode } = req.params;
  
    try {
      // Encontra a URL encurtada
      const shortenedUrl = await ShortenedUrl.findOne({ where: { short_code: shortCode } });
  
      if (!shortenedUrl) {
        return res.status(404).json({ message: 'URL not found' });
      }
  
      if (shortenedUrl.deleted_at) {
        return res.status(410).json({ message: 'URL has been deleted' });
      }
  
      // Cria o click e atualiza o click_count em uma única transação para garantir atomicidade
      await sequelize.transaction(async (transaction) => {
        // Cria o click
        await Click.create({ shortened_url_id: shortenedUrl.id }, { transaction });
  
        // Atualiza o click_count
        shortenedUrl.click_count = (shortenedUrl.click_count || 0) + 1;
        await shortenedUrl.save({ transaction });
      });
  
      // Redireciona após o sucesso da transação
      return res.redirect(shortenedUrl.original_url);
    } catch (error) {
      console.error('Error handling redirect:', error);
      return res.status(500).json({ message: 'Failed to handle redirect' });
    }
  }
  
  

  async list(req, res) {
    const userId = req.userId;

    if (userId === null) {
      return res.status(200).json({ urls: [] });
    }

    try {
      const userExists = await User.findOne({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const urls = await ShortenedUrl.findAll({ where: { user_id: userId, deleted_at: null } });
      return res.status(200).json({ urls });
    } catch (error) {
      console.error('Error listing URLs:', error);
      return res.status(500).json({ message: 'Failed to list URLs' });
    }
  }

  async update(req, res) {
    const { shortCode } = req.params;
    const { original_url } = req.body;
    const userId = req.userId;

    try {
      const userExists = await User.findOne({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const shortenedUrl = await ShortenedUrl.findOne({ where: { short_code: shortCode, user_id: userId } });

      if (!shortenedUrl) {
        return res.status(404).json({ message: 'URL not found' });
      }

      shortenedUrl.original_url = original_url;
      await shortenedUrl.save();

      return res.status(200).json({ message: 'URL updated successfully' });
    } catch (error) {
      console.error('Error updating URL:', error);
      return res.status(500).json({ message: 'Failed to update URL' });
    }
  }

  async delete(req, res) {
    const { shortCode } = req.params;
    const userId = req.userId;

    try {
      const userExists = await User.findOne({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const shortenedUrl = await ShortenedUrl.findOne({ where: { short_code: shortCode, user_id: userId } });

      if (!shortenedUrl) {
        return res.status(404).json({ message: 'URL not found' });
      }

      shortenedUrl.deleted_at = new Date();
      await shortenedUrl.save();

      return res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error) {
      console.error('Error deleting URL:', error);
      return res.status(500).json({ message: 'Failed to delete URL' });
    }
  }
}

module.exports = new ShortenedUrlController();
