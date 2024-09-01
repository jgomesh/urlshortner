const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string().trim().min(3).max(25).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  const user = req.body;
  const { error } = userValidation.validate(user, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map(err => err.message);
    return res.status(400).json({ errors: errorMessages });
  }

  return next();
};

module.exports = validateUser;
