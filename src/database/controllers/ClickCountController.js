const Click = require('../models/click.js');
const ShortenedUrl = require('../models/shortenedUrl.js');

class ClickController {
  async listClicks(req, res) {
    const { shortCode } = req.params;

    try {
      const shortenedUrl = await ShortenedUrl.findOne({
        where: { short_code: shortCode, user_id: req.userId },
      });

      if (!shortenedUrl) {
        return res.status(404).json({ message: 'URL not found or not owned by the user' });
      }

      const clicks = await Click.findAll({
        where: { shortened_url_id: shortenedUrl.id },
      });

      return res.status(200).json({ clicks });
    } catch (error) {
      console.error('Error listing clicks:', error);
      return res.status(500).json({ message: 'Failed to list clicks' });
    }
  }

  async listAllClicks(req, res) {
    try {
      const clicks = await Click.findAll();
      return res.status(200).json({ clicks });
    } catch (error) {
      console.error('Error listing all clicks:', error);
      return res.status(500).json({ message: 'Failed to list all clicks' });
    }
  }
}

module.exports = new ClickController();
