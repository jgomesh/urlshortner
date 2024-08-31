const bcrypt = require('bcrypt');
const User = require('../models/user.js');

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.findAll();

      if (users.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllSellers(req, res) {
    try {
      const sellers = await User.findAll({
        where: { role: 'seller' },
        attributes: { exclude: ['password', 'email'] },
      });

      if (sellers.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ sellers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const userExists = await User.findOne({ where: { id: req.userId } });

      if (!userExists) {
        return res.sendStatus(404);
      }

      return res.status(200).json({
        userId: req.userId,
        name: userExists.name,
        role: userExists.role,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    const { email, password, name } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.sendStatus(409);
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const user = await User.create({ email, password: hash, name, role: 'user' });
      return res.status(201).json({ id: user.id, status: 'success' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const rowsDeleted = await User.destroy({ where: { id } });

      if (rowsDeleted === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getSellerName(req, res) {
    const { id } = req.params;
    try {
      const seller = await User.findByPk(id, { attributes: { exclude: ['password'] } });

      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }

      return res.status(200).json({ seller });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
