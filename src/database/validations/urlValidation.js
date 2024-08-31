// Regex para validação de URLs
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{2,}\.)+[a-zA-Z]{2,}([\/\w \.-]*)*\/?$/;

// Middleware para validar URLs
const validateUrl = (req, res, next) => {
  const { original_url } = req.body;

  // Checa se a URL é válida e não ultrapassa 2048 caracteres
  if (!original_url || !urlRegex.test(original_url) || original_url.length > 2048) {
    return res.status(400).json({ error: 'Invalid URL format or URL is too long' });
  }

  next();
};

module.exports = validateUrl;
